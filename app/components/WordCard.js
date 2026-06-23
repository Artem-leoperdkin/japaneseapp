import { View, Text, StyleSheet } from 'react-native';

export default function WordCard({
    word,
    appLanguage = 'ru',
}) {
    const mainWord =
        word.word ||
        word.japanese ||
        '';

    const translation =
        word.translations?.[appLanguage] ||
        word.translation ||
        '';

    return (
        <View style={styles.card}>
        <Text style={styles.mainWord}>
            {mainWord}
        </Text>

        {!!word.romaji && (
            <Text style={styles.romaji}>
            {word.romaji}
            </Text>
        )}

        <Text style={styles.translation}>
            {translation}
        </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        borderRadius: 20,
        marginBottom: 12,

        borderWidth: 1,
        borderColor: '#E8E5F0',

        shadowColor: '#625B77',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 12,

        elevation: 2,
    },

    mainWord: {
        fontSize: 28,
        fontWeight: '800',
        color: '#2D2A3A',
    },

    romaji: {
        fontSize: 16,
        marginTop: 6,
        color: '#827D94',
    },

    translation: {
        fontSize: 18,
        marginTop: 8,
        color: '#4B465A',
    },
});