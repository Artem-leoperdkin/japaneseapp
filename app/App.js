import { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from 'expo-image-manipulator'

export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

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
  
      console.log(data);
  
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Japanese App
      </Text>

      <Button
        title="Выбрать фото"
        onPress={pickImage}
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      <Button
        title="Определить объект"
        onPress={analyzeImage}
      />

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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    marginBottom: 20,
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
  },
  
  japanese: {
    fontSize: 42,
  },
  
  romaji: {
    fontSize: 22,
    marginTop: 10,
  },
  
  translation: {
    fontSize: 20,
    marginTop: 10,
  },
});
