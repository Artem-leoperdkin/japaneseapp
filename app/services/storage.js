import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'words';

export const getWords = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const saveWord = async (word) => {
    try {
        const words = await getWords();

        const exists = words.find(
            item => item.object === word.object
        );

        if (exists) {
            return false;
        }

        words.push(word);

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(words)
        );

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const deleteWord = async (id) => {
    try {
        const words = await getWords();

        const filtered = words.filter(
            word => word.id !== id
        );

        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(filtered)
    );
        } catch (error) {
        console.log(error);
    }
};