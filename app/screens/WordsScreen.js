import { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
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

            <Text style={styles.counter}>
                Всего слов: {words.length}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={goBack}
            >
            <Text style={styles.buttonText}>
                Назад
            </Text>
            </TouchableOpacity>

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
        backgroundColor: "#f5f5f5",
    },

    title: {
        marginTop: 55,
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },

    counter: {
        fontSize: 18,
        color: "#666",
        marginBottom: 15,
    },

    button: {
        backgroundColor: '#111',
        paddingVertical: 14,
        paddingHorizontal: 25,

        borderRadius: 12,
    
        marginTop: 12,
        marginBottom: 15,
    
        width: 220,
    },
    
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});