import { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Pressable,
    Alert,
} from 'react-native';

import { strings } from '../translations/strings.js';
import { Icons } from '../styles/icons.js';

import styles from '../styles/wordsStyles.js';

import WordCard from '../components/WordCard';

export default function WordsScreen({
    goBack,
    savedWords,
    appLanguage,
    onDeleteWord,
}) {
    const [words, setWords] = useState(savedWords || []);

    const t = strings[appLanguage] || strings.ru;

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
            t.deleteTitle,
            t.deleteConfirm.replace('{word}', wordName),
            [
                {
                    text: t.cancel,
                    style: 'cancel',
                },
                {
                    text: t.delete,
                    style: 'destructive',
                    onPress: () => removeWord(item.id),
                },
            ]
        );
    };

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
                    {t.library}
                </Text>
    
                <View style={styles.topBarSpacer} />
            </View>
    
            <Text style={styles.counter}>
                {t.wordsCount}: {words.length}
            </Text>
    
            <FlatList
                data={words}
                keyExtractor={(item, index) =>
                    item.id?.toString() ||
                    index.toString()
                }
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
                            {t.noWordsTitle}
                        </Text>
    
                        <Text style={styles.emptyText}>
                            {t.noWordsDescription}
                        </Text>
    
                    </View>
                }
                contentContainerStyle={
                    words.length === 0
                        ? styles.emptyList
                        : styles.list
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};