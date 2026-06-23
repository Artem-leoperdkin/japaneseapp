import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';

import {
    saveLanguage,
    saveAppLanguage,
} from '../services/settings';

export default function SettingsScreen({
    goBack,
    language,
    setLanguage,
    appLanguage,
    setAppLanguage,
}) {
    const selectLearningLanguage = async (lang) => {
        await saveLanguage(lang);
        setLanguage(lang);
    };

    const selectAppLanguage = async (lang) => {
        await saveAppLanguage(lang);
        setAppLanguage(lang);
    };

return (
    <View style={styles.container}>
        <Text style={styles.title}>Настройки</Text>

        <Text style={styles.sectionTitle}>
            Язык обучения
        </Text>

        <Button
            title={
                language === 'ja'
                ? '✓ Японский'
                : 'Японский'
            }
            onPress={() => selectLearningLanguage('ja')}
        />

        <View style={styles.buttonSpace} />

        <Button
            title={
                language === 'it'
                ? '✓ Итальянский'
                : 'Итальянский'
            }
            onPress={() => selectLearningLanguage('it')}
        />

        <Text style={styles.sectionTitle}>
            Язык приложения
        </Text>

        <Button
            title={
                appLanguage === 'ru'
                ? '✓ Русский'
                : 'Русский'
            }
            onPress={() => selectAppLanguage('ru')}
        />

        <View style={styles.buttonSpace} />

        <Button
            title={
                appLanguage === 'en'
                ? '✓ English'
                : 'English'
            }
            onPress={() => selectAppLanguage('en')}
        />

        <View style={styles.backSpace} />

        <Button
            title="Назад"
            onPress={goBack}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#F8F7FC',
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#2D2A3A',
        marginBottom: 32,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4B465A',
        marginTop: 24,
        marginBottom: 12,
    },

    buttonSpace: {
        height: 10,
    },

    backSpace: {
        height: 32,
    },
});