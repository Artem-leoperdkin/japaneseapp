import AsyncStorage from '@react-native-async-storage/async-storage';

const LEARNING_LANGUAGE_KEY = 'learningLanguage';
const APP_LANGUAGE_KEY = 'appLanguage';

export const getLanguage = async () => {
const language = await AsyncStorage.getItem(
    LEARNING_LANGUAGE_KEY
);

return language || 'ja';
};

export const saveLanguage = async (language) => {
    await AsyncStorage.setItem(
        LEARNING_LANGUAGE_KEY,
        language
    );
};

export const getAppLanguage = async () => {
    const appLanguage = await AsyncStorage.getItem(
        APP_LANGUAGE_KEY
    );

    return appLanguage || 'ru';
};

export const saveAppLanguage = async (appLanguage) => {
    await AsyncStorage.setItem(
        APP_LANGUAGE_KEY,
        appLanguage
    );
};