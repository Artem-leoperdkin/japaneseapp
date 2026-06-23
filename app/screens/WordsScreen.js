import { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
    Alert,
} from 'react-native';

import WordCard from '../components/WordCard';

export default function WordsScreen({
    goBack,
    savedWords,
    appLanguage,
    onDeleteWord,
}) {
    const [words, setWords] = useState(savedWords || []);

    useEffect(() => {
        setWords(savedWords || []);
    }, [savedWords]);

    const getTranslation = (word) => {
        return (
            word.translations?.[appLanguage] ||
            word.translation ||
            ''
        );
    };

    const removeWord = async (id) => {
        await onDeleteWord(id);
    };

    const confirmDelete = (item) => {
        const wordName =
        item.word ||
        item.japanese ||
        getTranslation(item);

        Alert.alert(
        appLanguage === 'en' ? 'Delete word' : 'Удаление',
        appLanguage === 'en'
            ? `Delete "${wordName}"?`
            : `Удалить слово "${wordName}"?`,
        [
            {
                text: appLanguage === 'en' ? 'Cancel' : 'Отмена',
                style: 'cancel',
            },
            {
                text: appLanguage === 'en' ? 'Delete' : 'Удалить',
                style: 'destructive',
                onPress: () => removeWord(item.id),
            },
        ]
        );
    };

    const isEnglish = appLanguage === 'en';

    return (
        <View style={styles.container}>
        <Text style={styles.title}>
            {isEnglish ? 'My words' : 'Мои слова'}
        </Text>

        <Text style={styles.counter}>
            {isEnglish
                ? `Words: ${words.length}`
                : `Всего слов: ${words.length}`}
        </Text>

        <TouchableOpacity
            style={styles.button}
            onPress={goBack}
        >
            <Text style={styles.buttonText}>
                {isEnglish ? 'Back' : 'Назад'}
            </Text>
        </TouchableOpacity>

        <FlatList
            data={words}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => (
                <Pressable
                    onLongPress={() => confirmDelete(item)}
                >
                    <WordCard
                        word={item}
                        appLanguage={appLanguage}
                    />
                </Pressable>
            )}
            ListEmptyComponent={
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyTitle}>
                    {isEnglish
                        ? 'No words yet'
                        : 'Пока нет слов'}
                    </Text>

                    <Text style={styles.emptyText}>
                    {isEnglish
                        ? 'Take a photo and save your first word.'
                        : 'Сфотографируй объект и сохрани первое слово.'}
                    </Text>
                </View>
            }
            contentContainerStyle={
                words.length === 0
                    ? styles.emptyList
                    : styles.list
            }
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F7FC',
    },

    title: {
        marginTop: 55,
        fontSize: 30,
        fontWeight: '800',
        color: '#2D2A3A',
        marginBottom: 8,
    },

    counter: {
        fontSize: 16,
        color: '#827D94',
        marginBottom: 14,
    },

    button: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E5F0',
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 16,
        marginBottom: 18,
        width: 140,
    },

    buttonText: {
        color: '#625B77',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },

    list: {
        paddingBottom: 40,
    },

    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },

    emptyBox: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E5F0',
        borderRadius: 24,
        padding: 26,
        alignItems: 'center',
    },

    emptyTitle: {
        color: '#2D2A3A',
        fontSize: 20,
        fontWeight: '800',
    },

    emptyText: {
        color: '#827D94',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 21,
    },
});