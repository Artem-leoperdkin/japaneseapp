import { View, Button, Text } from 'react-native';

import {
    saveLanguage
} from '../services/settings';

export default function SettingsScreen({
    goBack,
    language,
    setLanguage
}) {

    const selectLanguage = async (lang) => {
        await saveLanguage(lang);
        setLanguage(lang);
        goBack();
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                padding: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    marginBottom: 20,
                }}
            >
                Язык обучения
            </Text>

            <Button
                title="Японский"
                onPress={() =>
                    selectLanguage('ja')
                }
            />

            <Button
                title="Итальянский"
                onPress={() =>
                    selectLanguage('it')
                }
            />
        </View>
    );
}