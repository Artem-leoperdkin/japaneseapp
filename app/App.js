import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImageManipulator from 'expo-image-manipulator'
import { CameraView, useCameraPermissions } from 'expo-camera';
import WordsScreen  from "./screens/WordsScreen.js";
import QuizScreen from "./screens/QuizScreen.js";
import { getLanguage, getAppLanguage } from "./services/settings.js";
import { 
  getWords,
  deleteWord as deleteWordFromStorage,
} from "./services/storage.js";
import SettingsScreen from "./screens/SettingsScreen.js";


export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [screen, setScreen] = useState('home');
  const [language, setLanguage] = useState('ja');
  const [applanguage, setAppLanguage] = useState('ja');
  const [savedWords, setSavedWords] = useState([]);

  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');

  useEffect(() => {
    loadLanguage();
    loadAppLanguage();
    loadSavedWords();
  }, []);

  const loadLanguage = async () => {
    const savedLanguage = 
      await getLanguage();

    setLanguage(savedLanguage);
  };

  const loadAppLanguage = async () => {
    const savedAppLanguage = await getAppLanguage();

    setAppLanguage(savedAppLanguage);
  };

  const takePhoto = async () => {
    try {
      if (!cameraRef.current) return;
  
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
  
      setImage(photo.uri);
  
      await analyzeImage(photo.uri);
    } catch (error) {
      console.log('Ошибка камеры:', error);
    }
  };

  const analyzeImage = async (imageUri) => {
    try {
      const converted = await ImageManipulator.manipulateAsync(
        imageUri,
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

      formData.append('language', language);
      formData.append('applanguage', applanguage);
      
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

      if (!parsed.word || !parsed.translation) {
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
        japanese: result.word,
        romaji: result.romaji,
        translation: result.translation,
        translations: result.translations,
        language: result.language,
        applanguage: result.applanguage,
      };
      
      const exists = words.find(
        word => word.object === result.object && word.language === result.language
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

      setSavedWords(words);
  
      alert('Карточка сохранена');

      setImage(null);
      setResult(null);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSavedWords = async () => {
    const words = await getWords();

    setSavedWords(words);
  }

  const removeSavedWord = async (id) => {
    try {
      await deleteWordFromStorage(id);
  
      const updatedWords = savedWords.filter(
        word => word.id !== id
      );
  
      setSavedWords(updatedWords);
    } catch (error) {
      console.log('Ошибка удаления слова:', error);
    }
  };

  const currentLanguageWords = savedWords.filter(
    word => word.language === language
  );

  if (screen == 'words') {
    return <WordsScreen
      goBack={() => setScreen('home')}
      savedWords={currentLanguageWords}
      applanguage={applanguage}
      onDeleteWord={removeSavedWord}
    />
  }

  if (screen == 'quiz') {
    return (
      <QuizScreen
        goBack={() => setScreen('home')}
        language={language}
        savedWords={currentLanguageWords}
      />
    )
  }

  if (!permission) {
    return <View style={styles.container} />;
  }
  
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Разреши доступ к камере, чтобы добавлять слова
        </Text>
  
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            Разрешить камеру
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen ==='settings') {
    return (
      <SettingsScreen
        goBack={() => setScreen('home')}
        language={language}
        setLanguage={setLanguage}
        applanguage={applanguage}
        setAppLanguage={setAppLanguage}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>LingoLens</Text>
  
        <View style={styles.topActions}>
          <TouchableOpacity
            style={styles.topIconButton}
            onPress={() => setScreen('settings')}
          >
            <Text style={styles.topIcon}>⚙︎</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.topIconButton}
            onPress={() => setScreen('words')}
          >
            <Text style={styles.topIcon}>▦</Text>
          </TouchableOpacity>
        </View>
      </View>
  
      {!image ? (
        <>
          <View style={styles.cameraFrame}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
              flash={flash}
            />
          </View>
  
          <Text style={styles.hint}>
            Сфотографируй предмет, чтобы добавить слово
          </Text>
  
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.sideButton}
              onPress={() =>
                setFlash(current =>
                  current === 'off' ? 'on' : 'off'
                )
              }
            >
              <Text
                style={[
                  styles.sideButtonText,
                  flash === 'on' && styles.flashActive,
                ]}
              >
                ⚡︎
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePhoto}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.sideButton}
              onPress={() =>
                setFacing(current =>
                  current === 'back' ? 'front' : 'back'
                )
              }
            >
              <Text style={styles.sideButtonText}>↻</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image
            source={{ uri: image }}
            style={styles.previewImage}
          />
  
          {!result ? (
            <Text style={styles.loadingText}>
              Распознаём предмет...
            </Text>
          ) : (
            <View style={styles.resultBox}>
              <Text style={styles.japanese}>
                {result.word}
              </Text>
            
              {result.romaji && (
                <Text style={styles.romaji}>
                  {result.romaji}
                </Text>
              )}
  
              <Text style={styles.translation}>
                {result.translation}
              </Text>
            </View>
          )}
  
          {result && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveWord}
            >
              <Text style={styles.saveButtonText}>
                Сохранить слово
              </Text>
            </TouchableOpacity>
          )}
  
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => {
              setImage(null);
              setResult(null);
            }}
          >
            <Text style={styles.retakeButtonText}>
              Сфотографировать ещё раз
            </Text>
          </TouchableOpacity>
        </>
      )}
  
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => setScreen('quiz')}
      >
        <Text style={styles.quizButtonText}>
          Проверить себя
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
    paddingHorizontal: 20,
    paddingTop: 64,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  logo: {
    color: '#2D2A3A',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.8,
  },

  topActions: {
    flexDirection: 'row',
    gap: 10,
  },

  topIconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E5F0',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#5C5670',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 2,
  },

  topIcon: {
    color: '#625B77',
    fontSize: 23,
  },

  cameraFrame: {
    width: '100%',
    aspectRatio: 0.82,
    borderRadius: 34,
    overflow: 'hidden',
    backgroundColor: '#EDEAF5',
    borderWidth: 2,
    borderColor: '#FFFFFF',

    shadowColor: '#5C5670',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 5,
  },

  camera: {
    flex: 1,
  },

  hint: {
    color: '#827D94',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 18,
  },

  controls: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  sideButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E5F0',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#5C5670',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 2,
  },

  sideButtonText: {
    color: '#625B77',
    fontSize: 31,
    fontWeight: '500',
  },

  flashActive: {
    color: '#8D7FE8',
  },

  captureButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#EAE7FF',
    borderWidth: 3,
    borderColor: '#A99BF7',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#8D7FE8',
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 5,
  },

  captureInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#A99BF7',
  },

  previewImage: {
    width: '100%',
    aspectRatio: 0.82,
    borderRadius: 34,
    backgroundColor: '#EDEAF5',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  loadingText: {
    color: '#827D94',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },

  resultBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8E5F0',
    marginTop: 18,
    paddingVertical: 20,
    paddingHorizontal: 24,

    shadowColor: '#5C5670',
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 3,
  },

  japanese: {
    color: '#2D2A3A',
    fontSize: 42,
    fontWeight: '800',
  },

  romaji: {
    color: '#827D94',
    fontSize: 17,
    marginTop: 6,
  },

  translation: {
    color: '#4B465A',
    fontSize: 19,
    marginTop: 10,
    textAlign: 'center',
  },

  saveButton: {
    backgroundColor: '#A99BF7',
    borderRadius: 18,
    paddingVertical: 16,
    marginTop: 18,

    shadowColor: '#8D7FE8',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 4,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },

  retakeButton: {
    alignItems: 'center',
    marginTop: 18,
  },

  retakeButtonText: {
    color: '#756E88',
    fontSize: 16,
    fontWeight: '600',
  },

  quizButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E5F0',
    borderRadius: 18,
    paddingVertical: 16,
    marginTop: 'auto',
    marginBottom: 26,
  },

  quizButtonText: {
    color: '#625B77',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: '#F8F7FC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  permissionText: {
    color: '#2D2A3A',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

  permissionButton: {
    backgroundColor: '#A99BF7',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
  },

  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});