import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/settingsStyles';

import { Icons } from '../styles/icons';
import { strings } from '../translations/strings';

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
    const [showLearningLanguages, setShowLearningLanguages] =
        useState(false);

    const [showAppLanguages, setShowAppLanguages] =
        useState(false);

    const t = strings[appLanguage] || strings.ru;

    const selectLearningLanguage = async (lang) => {
        await saveLanguage(lang);
        setLanguage(lang);
        setShowLearningLanguages(false);
    };

    const selectAppLanguage = async (lang) => {
        await saveAppLanguage(lang);
        setAppLanguage(lang);
        setShowAppLanguages(false);
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
                    {t.settings}
                </Text>

                <View style={styles.topBarSpacer} />
            </View>

            <TouchableOpacity
                style={styles.settingCard}
                onPress={() =>
                    setShowLearningLanguages(
                        !showLearningLanguages
                    )
                }
            >
                <View style={styles.cardLeft}>
                    <Text style={styles.cardTitle}>
                        {Icons.language} {t.learningLanguage}
                    </Text>

                    <Text style={styles.cardValue}>
                        {language === 'ja'
                            ? t.japanese
                            : t.italian}
                    </Text>
                </View>

                <Text style={styles.arrow}>
                    {showLearningLanguages ? '⌃' : '›'}
                </Text>
            </TouchableOpacity>

            {showLearningLanguages && (
                <View style={styles.popupCard}>

                    <TouchableOpacity
                        style={styles.popupItem}
                        onPress={() => selectLearningLanguage('ja')}
                    >
                        <Text style={styles.popupText}>
                            {t.japanese}
                        </Text>
            
                        {language === 'ja' && (
                            <Text style={styles.check}>
                                ✓
                            </Text>
                        )}
                    </TouchableOpacity>
            
                    <View style={styles.popupDivider} />
            
                    <TouchableOpacity
                        style={styles.popupItem}
                        onPress={() => selectLearningLanguage('it')}
                    >
                        <Text style={styles.popupText}>
                            {t.italian}
                        </Text>
            
                        {language === 'it' && (
                            <Text style={styles.check}>
                                ✓
                            </Text>
                        )}
                    </TouchableOpacity>
            
                </View>
            )}

            <TouchableOpacity
                style={styles.settingCard}
                onPress={() =>
                    setShowAppLanguages(
                        !showAppLanguages
                    )
                }
            >
                <View style={styles.cardLeft}>
                    <Text style={styles.cardTitle}>
                        {Icons.phone} {t.appLanguage}
                    </Text>

                    <Text style={styles.cardValue}>
                        {appLanguage === 'ru'
                            ? t.russian
                            : t.english}
                    </Text>
                </View>

                <Text style={styles.arrow}>
                    {showAppLanguages ? '⌃' : '›'}
                    </Text>
            </TouchableOpacity>

            {showAppLanguages && (
                <View style={styles.popupCard}>

                    <TouchableOpacity
                        style={styles.popupItem}
                        onPress={() => selectAppLanguage('ru')}
                    >
                        <Text style={styles.popupText}>
                            🇷🇺 {t.russian}
                        </Text>
            
                        {appLanguage === 'ru' && (
                            <Text style={styles.check}>
                                ✓
                            </Text>
                        )}
                    </TouchableOpacity>
            
                    <View style={styles.popupDivider} />
            
                    <TouchableOpacity
                        style={styles.popupItem}
                        onPress={() => selectAppLanguage('en')}
                    >
                        <Text style={styles.popupText}>
                            🇬🇧 {t.english}
                        </Text>
            
                        {appLanguage === 'en' && (
                            <Text style={styles.check}>
                                ✓
                            </Text>
                        )}
                    </TouchableOpacity>
            
                </View>
            )}

            <View style={styles.settingCard}>

                <View style={styles.cardLeft}>
                    <Text style={styles.cardTitle}>
                        {Icons.info} About
                    </Text>

                    <Text style={styles.cardValue}>
                        Version 0.1 Alpha
                    </Text>
                </View>

            </View>

        </View>
    );
}