import { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    ScrollView,
} from 'react-native';

import { strings } from '../translations/strings.js';
import { Icons } from '../styles/icons.js';

import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

import styles from '../styles/quizStyles.js';

export default function QuizScreen({ goBack, language, savedWords, appLanguage }) {
    const [currentWord, setCurrentWord] = useState(null);
    const [checkResult, setCheckResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);

    const [facing, setFacing] = useState('back');
    const [flash, setFlash] = useState('off');

    const cameraRef = useRef(null);

    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const [permission, requestPermission] = useCameraPermissions();

    const t = strings[appLanguage] || strings.ru;

    useEffect(() => {
        loadRandomWord();
    }, [language, savedWords]);

    const loadRandomWord = async () => {
        if (!savedWords || savedWords.length === 0) {
            setLoadError(t.noWords);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setLoadError(null);
            setCheckResult(null);
            setCurrentWord(null);
            setPhotoUri(null);
            setIsChecking(false);

            const objectIds = savedWords.map(
                word => word.object
            );

            const response = await fetch(
                `http://192.168.0.108:3000/random-word?language=${language}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        objectIds,
                    }),
                }
            );

            const data = await response.json();

            console.log('RANDOM WORD RESPONSE:', data);

            if (!response.ok || data.error) {
                throw new Error(
                    data.error || t.serverWordError
                );
            }

            if (!data.object || !data.word) {
                throw new Error(
                    'Сервер вернул слово в неправильном формате'
                );
            }

            setCurrentWord(data);
        } catch (error) {
            console.log('Ошибка загрузки слова:', error);
            setLoadError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const takePhoto = async () => {
        try {
            if (!cameraRef.current || !currentWord || isChecking) {
                return;
            }

            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
            });

            setPhotoUri(photo.uri);
            setIsChecking(true);

            await checkAnswer(photo.uri);
        } catch (error) {
            console.log('Ошибка фото:', error);
            setIsChecking(false);
            setPhotoUri(null);
        }
    };

    const shakeWordCard = () => {
        shakeAnimation.setValue(0);
    
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 1,
                duration: 70,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -1,
                duration: 70,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 1,
                duration: 70,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 70,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const checkAnswer = async (imageUri) => {
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

            formData.append('image', {
                uri: converted.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });

            const response = await fetch(
                'http://192.168.0.108:3000/analyze',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            console.log('ANALYZE RESPONSE:', data);

            if (!response.ok || data.error) {
                setCheckResult('wrong');
                shakeWordCard();

                setTimeout(() => {
                    setPhotoUri(null);
                    setCheckResult(null);
                }, 1800);

                return;
            }

            const parsed = JSON.parse(data.answer);

            console.log('EXPECTED:', currentWord.object);
            console.log('DETECTED:', parsed.object);

            if (parsed.object === currentWord.object) {
                setCheckResult('correct');

                setTimeout(() => {
                    loadRandomWord();
                }, 1200);
            } else {
                setCheckResult('wrong');
                shakeWordCard();

                setTimeout(() => {
                    setPhotoUri(null);
                    setCheckResult(null);
                }, 1800);
            }

        } catch (error) {
            console.log('Ошибка проверки:', error);
            setCheckResult('wrong');
            shakeWordCard();

            setTimeout(() => {
                setPhotoUri(null);
                setCheckResult(null);
            }, 1800);

        } finally {
            setIsChecking(false);
        }
    };

    if (!permission) {
    return <View />;
    }

    if (!permission.granted) {
    return (
    <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>
            {t.permissionTitle}
        </Text>

        <Text style={styles.permissionText}>
            {t.permissionDescription}
        </Text>

        <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
        >
            <Text style={styles.permissionButtonText}>
                {t.alllow}
            </Text>
        </TouchableOpacity>
    </View>
    );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={goBack}
                >
                    <Text style={styles.backButtonText}>
                        {Icons.back}
                    </Text>
                </TouchableOpacity>
    
                <Text style={styles.title}>
                    {t.quiz}
                </Text>
    
                <View style={styles.topBarSpacer} />
            </View>
    
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cameraFrame}>
                    {photoUri ? (
                        <Image
                            source={{ uri: photoUri }}
                            style={styles.camera}
                        />
                    ) : (
                        <CameraView
                            ref={cameraRef}
                            style={styles.camera}
                            facing={facing}
                            flash={flash}
                        />
                    )}
                </View>
    
                {isLoading && (
                    <View style={styles.wordCard}>
                        <Text style={styles.loadingText}>
                            {t.loadingWord}
                        </Text>
                    </View>
                )}
    
                {loadError && (
                    <View style={styles.errorCard}>
                        <Text style={styles.errorText}>
                            {loadError}
                        </Text>
                    </View>
                )}
    
                {currentWord && !isLoading && (
                    <>
                        <Animated.View
                            style={[
                                styles.wordCard,
                                checkResult === 'correct' &&
                                    styles.wordCardCorrect,
                                checkResult === 'wrong' &&
                                    styles.wordCardWrong,
                                {
                                    transform: [
                                        {
                                            translateX: shakeAnimation.interpolate({
                                                inputRange: [-1, 0, 1],
                                                outputRange: [-10, 0, 10],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Text style={styles.word}>
                                {currentWord.word}
                            </Text>
    
                            {currentWord.romaji && (
                                <Text style={styles.romaji}>
                                    {currentWord.romaji}
                                </Text>
                            )}
                        </Animated.View>
    
                        <Text style={styles.wordHint}>
                            {t.objectHint}
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
                                        flash === 'on' &&
                                            styles.flashActive,
                                    ]}
                                >
                                    {Icons.flash}
                                </Text>
                            </TouchableOpacity>
    
                            <TouchableOpacity
                                style={[
                                    styles.captureButton,
                                    isChecking &&
                                    styles.captureButtonDisabled,
                            ]}
                            onPress={takePhoto}
                            disabled={isChecking}
                        >
                            <View style={styles.captureInner} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sideButton}
                            onPress={() =>
                                setFacing(current =>
                                    current === 'back'
                                        ? 'front'
                                        : 'back'
                                )
                            }
                        >
                            <Text style={styles.sideButtonText}>
                                {Icons.rotate}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {checkResult === 'correct' && (
                        <View style={styles.correctBadge}>
                            <Text style={styles.correctText}>
                                {Icons.success} {t.correct}
                            </Text>
                        </View>
                    )}

                    {checkResult === 'wrong' && (
                        <View style={styles.wrongBadge}>
                            <Text style={styles.wrongText}>
                                {t.wrong}
                            </Text>
                        </View>
                    )}
                </>
                )}
            </ScrollView>
        </View>
    );
}