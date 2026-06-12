import { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator'
import WordsScreen  from "./screens/WordsScreen.js";
import QuizScreen from "./screens/QuizScreen.js";

export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [screen, setScreen] = useState('home');

  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async () => {
    try {
      const converted = await ImageManipulator.manipulateAsync(
        image,
        [],
        {
          compress: 0.9,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
  
      const formData = new FormData();
  
      formData.append("image", {
        uri: converted.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });
      
      console.log(converted.uri);

      const response = await fetch(
        "http://192.168.0.111:3000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
        return;
      }

      const parsed = JSON.parse(data.answer);

      console.log("PARSED:");
      console.log(parsed);

      if (
        !parsed.japanese ||
        !parsed.romaji ||
        !parsed.translation
      ) {
        alert(
          'Не удалось распознать слово. Попробуйте другое фото.'
        );

        return;
      }

      setResult(parsed);
      console.log(parsed);
      console.log(data);
  
    } catch (error) {
      console.log(error);
    }
  };

  const saveWord = async () => {
    if (!result) return;
  
    try {
      const existingWords =
        await AsyncStorage.getItem('words');
  
      const words =
        existingWords
          ? JSON.parse(existingWords)
          : [];
  
      const newWord = {
        id: Date.now().toString(),
        image,
        object: result.object,
        japanese: result.japanese,
        romaji: result.romaji,
        translation: result.translation,
      };
      
      const exists = words.find(
        word => word.object === result.object
      );
      
      if (exists) {
        alert('Это слово уже сохранено');
        return;
      }

      words.push(newWord);
  
      await AsyncStorage.setItem(
        'words',
        JSON.stringify(words)
      );
  
      alert('Карточка сохранена');
    } catch (error) {
      console.log(error);
    }
  };

  if (screen == 'words') {
    return <WordsScreen
      goBack={() => setScreen('home')}
    />
  }

  if (screen == 'quiz') {
    return (
      <QuizScreen
        goBack={() => setScreen('home')}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Japanese App
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setScreen('words')}
      >
        <Text style={styles.buttonText}>
          Мои слова
        </Text>
      </TouchableOpacity>

      <Button
        title="Проверка"
        onPress={() => setScreen('quiz')}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>
          Выбрать фото
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={analyzeImage}
      >
        <Text style={styles.buttonText}>
          Определить объект
        </Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.japanese}>
            {result.japanese}
          </Text>

          <Text style={styles.romaji}>
            {result.romaji}
          </Text>

          <Text style={styles.translation}>
            {result.translation}
          </Text>

        </View>

      )}

      <TouchableOpacity
        style={styles.button}
        onPress={saveWord}
      >
        <Text style={styles.buttonText}>
          Сохранить слово
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: '#f5f5f5'
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  button: {
    backgroundColor: '#111',
  
    paddingVertical: 14,
    paddingHorizontal: 25,
  
    borderRadius: 12,
  
    marginTop: 12,
  
    width: 220,
  },
  
  buttonText: {
    color: '#fff',
  
    textAlign: 'center',
  
    fontSize: 16,
    fontWeight: '600',
  },

  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 10,
  },

  resultBox: {
    marginTop: 20,
    alignItems: 'center',

    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,

    width: '100%',
    maxWidth: 320,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 5,
  },
  
  japanese: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  
  romaji: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  
  translation: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
});
