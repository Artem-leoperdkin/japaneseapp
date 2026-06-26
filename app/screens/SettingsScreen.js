import styles from '../styles/settingsStyles.js';

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

            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={goBack}
                >
                    <Text style={styles.backButtonText}>
                        ‹
                    </Text>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Настройки
                </Text>

                <View style={styles.topBarSpacer} />
            </View>

            <TouchableOpacity
                style={styles.settingCard}
                onPress={() => {}}
            >
                <View>
                    <Text style={styles.cardTitle}>
                        🌏 Язык обучения
                    </Text>

                    <Text style={styles.cardValue}>
                        {language === 'ja'
                            ? 'Японский'
                            : 'Итальянский'}
                    </Text>
                </View>

                <Text style={styles.arrow}>
                    ›
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingCard}
                onPress={() => {}}
            >
                <View>
                    <Text style={styles.cardTitle}>
                        📱 Язык приложения
                    </Text>

                    <Text style={styles.cardValue}>
                        {appLanguage === 'ru'
                            ? 'Русский'
                            : 'English'}
                    </Text>
                </View>

                <Text style={styles.arrow}>
                    ›
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingCard}
            >
                <View>
                    <Text style={styles.cardTitle}>
                        ℹ️ О приложении
                    </Text>

                    <Text style={styles.cardValue}>
                        Version 0.1 Alpha
                    </Text>
                </View>

                <Text style={styles.arrow}>
                    ›
                </Text>
            </TouchableOpacity>

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