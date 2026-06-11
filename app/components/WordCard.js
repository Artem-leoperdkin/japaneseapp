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
        backgroundColor: "#ffffff",

        padding: 16,

        borderRadius: 16,

        marginBottom: 12,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,

        elevation: 4,
    },

    japanese: {
        fontSize: 28,
        fontWeight: "bold",
    },

    romaji: {
        fontSize: 18,
        marginTop: 5,
        color: "#666",
    },

    translation: {
        fontSize: 18,
        marginTop: 5,
    },
});