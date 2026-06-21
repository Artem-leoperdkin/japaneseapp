import { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';

import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

export default function QuizScreen({ goBack, language, savedWords }) {
    const [currentWord, setCurrentWord] = useState(null);
    const [checkResult, setCheckResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    const cameraRef = useRef(null);

    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        loadRandomWord();
    }, [language, savedWords]);

    const loadRandomWord = async () => {

        if (!savedWords || savedWords.length === 0) {
            setLoadError(
                'Сначала добавь хотя бы одно слово в библиотеку'
            );
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setLoadError(null);
            setCheckResult(null);
            setCurrentWord(null);

            const objectIds = savedWords.map(
                word => word.object
            );
    
            const response = await fetch(
                `http://192.168.0.111:3000/random-word?language=${language}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        objectIds
                    }),
                }
            );
    
            const data = await response.json();
    
            console.log('RANDOM WORD RESPONSE:', data);
    
            if (!response.ok || data.error) {
                throw new Error(
                    data.error || 'Сервер не отдал слово'
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
            if (!cameraRef.current || !currentWord) return;

            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
            });

            checkAnswer(photo.uri);
        } catch (error) {
            console.log(error);
        }
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
                'http://192.168.0.111:3000/analyze',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            console.log('ANALYZE RESPONSE:', data);

            if (!response.ok || data.error) {
                console.log('Ошибка распознавания:', data.error);

                setCheckResult('wrong');
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
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>Нужно разрешение на камеру</Text>

                <Button
                    title="Разрешить"
                    onPress={requestPermission}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Проверка</Text>

            <Button
                title="Назад"
                onPress={goBack}
            />

            <View style={styles.cameraContainer}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing="back"
                />
            </View>

            {isLoading && (
                <Text style={styles.loading}>
                    Загружаю слово...
                </Text>
            )}

            {loadError && (
                <Text style={styles.wrong}>
                    Ошибка: {loadError}
                </Text>
            )}

            {currentWord && !isLoading && (
                <>
                    <Text style={styles.japanese}>
                        {currentWord.word}
                    </Text>

                    {currentWord.romaji && (
                        <Text style={styles.
                            romaji}>
                            {currentWord.romaji}
                        </Text>
                    )}

                    <Button
                        title="Сфотографировать"
                        onPress={takePhoto}
                    />

                    {checkResult === 'correct' && (
                        <Text style={styles.correct}>
                            ✅ Верно
                        </Text>
                    )}

                    {checkResult === 'wrong' && (
                        <Text style={styles.wrong}>
                            ❌ Неверно
                        </Text>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },

    title: {
        marginTop: 55,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    cameraContainer: {
        width: '100%',
        height: 280,
        overflow: 'hidden',
        borderRadius: 16,
        marginTop: 20,
        marginBottom: 20,
    },

    camera: {
        flex: 1,
    },

    japanese: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 8,
    },

    romaji: {
        textAlign: 'center',
        fontSize: 20,
        color: '#666',
        marginBottom: 15,
    },

    loading: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },

    correct: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 22,
        color: 'green',
        fontWeight: 'bold',
    },

    wrong: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 22,
        color: 'red',
        fontWeight: 'bold',
    },
});