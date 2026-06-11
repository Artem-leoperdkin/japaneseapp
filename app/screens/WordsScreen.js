import { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Button,
} from 'react-native';

import { getWords } from '../services/storage';
import WordCard from '../components/WordCard';


export default function WordsScreen({ goBack }) {
    const [words, setWords] = useState([]);

    useEffect(() => {
        loadWords();
    }, []);

    const loadWords = async () => {
        const savedWords = await getWords();
        setWords(savedWords);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Мои слова
            </Text>

            <Button
                title='Назад'
                onPress={goBack}
            />

            <FlatList
                data={words}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <WordCard word={item} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});