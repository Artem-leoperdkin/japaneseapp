import { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';

import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { getWords } from '../services/storage';

export default function QuizScreen({ goBack }) {
    const [currentWord, setCurrentWord] = useState(null);
    const [checkResult, setCheckResult] = useState(null);

    const cameraRef = useRef(null);

    const [permission, requestPermission] = useCameraPermissions();


    useEffect(() => {
        loadRandomWord();
    }, []);

    const loadRandomWord = async () => {
        const words = await getWords();

        if (words.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * words.length);

        setCurrentWord(words[randomIndex]);

        setCheckResult(null);
    };

    const takePhoto = async () => {
        try {
            if (!cameraRef.current) return;

            const photo =
                await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                });

            console.log(photo.uri);

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
                <Text>
                    Нужно разрешение на камеру
                </Text>
        
                <Button
                    title="Разрешить"
                    onPress={requestPermission}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
    
            <Text style={styles.title}>
                Проверка
            </Text>
    
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
    
            {currentWord && (
                <>
                    <Text style={styles.japanese}>
                        {currentWord.japanese}
                    </Text>
    
                    <Text style={styles.romaji}>
                        {currentWord.romaji}
                    </Text>

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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    japanese: {
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 30,
    },

    romaji: {
        fontSize: 22,
        marginTop: 10,
        marginBottom: 30,
        color: '#666',
    },

    correct: {
        fontSize: 28,
        marginTop: 20,
    },

    wrong: {
        fontSize: 28,
        marginTop: 20,
    },

    cameraContainer: {
        width: '100%',
        height: 350,

        borderRadius: 20,
        overflow: 'hidden',

        marginTop: 20,
        marginBottom: 20,
    },

    camera: {
        flex: 1,
    },
});