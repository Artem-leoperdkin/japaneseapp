import { View, Text, StyleSheet } from 'react-native';

export default function WordCard({ word }) {
    return (
        <View style={styles.card}>
            <Text style={styles.japanese}>
                {word.japanese}
            </Text>

            <Text style={styles.romaji}>
                {word.romaji}
            </Text>

            <Text style={styles.translation}>
                {word.translation}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        width: '100%',
    },

    japanese: {
        fontSize: 28,
        fontWeight: 'bold',
    },

    omaji: {
        fontSize: 18,
        marginTop: 5,
    },

    translation: {
        fontSize: 18,
        marginTop: 5,
    },
});