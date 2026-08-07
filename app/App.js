import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";

import styles from "./styles/homeStyles.js";
import { strings } from "./translations/strings.js";
import { Icons } from "./styles/icons.js";

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
  const [appLanguage, setAppLanguage] = useState('en');
  const [savedWords, setSavedWords] = useState([]);
  const [showResultCard, setShowResultCard] = useState(false);

  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');

  const t = strings[appLanguage] || strings.ru;

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
      formData.append('appLanguage', appLanguage);
      
      console.log(converted.uri);

      console.log('Sending request...');
      console.log('Lang:', language);
      console.log('App lang:', appLanguage);

      const response = await fetch(
        "http://192.168.0.106:3000/analyze",
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
      setShowResultCard(true);

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
        appLanguage: result.appLanguage,
      };
      
      const exists = words.find(
        word => word.object === result.object && word.language === result.language
      );
      
      if (exists) {
        alert(t.alreadySaved);
        return;
      }

      words.push(newWord);
  
      await AsyncStorage.setItem(
        'words',
        JSON.stringify(words)
      );

      setSavedWords(words);
  
      alert(t.saved);

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
      appLanguage={appLanguage}
      onDeleteWord={removeSavedWord}
    />
  }

  if (screen == 'quiz') {
    return (
      <QuizScreen
        goBack={() => setScreen('home')}
        language={language}
        savedWords={currentLanguageWords}
        appLanguage={appLanguage}
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
          {t.permission}
        </Text>
  
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            {t.allow}
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
        appLanguage={appLanguage}
        setAppLanguage={setAppLanguage}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>
          {t.appTitle}
        </Text>
  
        <View style={styles.topActions}>
          <TouchableOpacity
            style={styles.topIconButton}
            onPress={() => setScreen('settings')}
          >
            <Text style={styles.topIcon}>
              {Icons.settings}
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.topIconButton}
            onPress={() => setScreen('words')}
          >
            <Text style={styles.topIcon}>
              {Icons.library}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
              {t.start}
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
                  {Icons.flash}
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
                <Text style={styles.sideButtonText}>{Icons.rotate}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.previewFrame}>
              <Image
                source={{ uri: image }}
                style={styles.previewImage}
              />
            </View>
        
            {!result && (
              <View style={styles.loadingBox}>
                <Text style={styles.loadingEmoji}>✦</Text>
                <Text style={styles.loadingText}>
                  {t.analyzing}
                </Text>
              </View>
            )}
          </>
        )}

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => setScreen('quiz')}
      >
        <Text style={styles.quizButtonText}>
          {t.check}
        </Text>
      </TouchableOpacity>
    </ScrollView>

    <Modal
      visible={showResultCard}
      transparent
      animationType="fade"
      onRequestClose={() => setShowResultCard(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.wordModalCard}>
          <View style={styles.modalPhotoFrame}>
            <Image
              source={{ uri: image }}
              style={styles.modalPhoto}
            />
          </View>

          <Text
            style={styles.modalWord}
            numberOfLines={3}
            adjustsFontSizeToFit
          >
            {result?.word}
          </Text>

          {result?.romaji && (
            <Text style={styles.modalRomaji}>
              {result.romaji}
            </Text>
          )}

          <Text style={styles.modalTranslation}>
            {result?.translation}
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.retakeModalButton}
              onPress={() => {
                setShowResultCard(false);
                setImage(null);
                setResult(null);
              }}
            >
              <Text style={styles.retakeModalText}>
                ↻ {t.retake}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveModalButton}
              onPress={async () => {
                await saveWord();
                setShowResultCard(false);
                setImage(null);
                setResult(null);
              }}
            >
              <Text style={styles.saveModalText}>
                {t.save}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </View>
  );
}