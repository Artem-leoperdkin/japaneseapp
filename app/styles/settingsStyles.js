import { StyleSheet } from 'react-native';

import {
    Colors,
    Radius,
    Font,
    Shadow,
} from './theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginTop: 64,
        marginBottom: 30,
    },

    backButton: {
        width: 46,
        height: 46,
        borderRadius: Radius.round,

        backgroundColor: Colors.card,

        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: Colors.border,

        ...Shadow.card,
    },

    backButtonText: {
        color: Colors.textSecondary,
        fontSize: 28,
        fontWeight: '600',
    },

    topBarSpacer: {
        width: 46,
    },

    title: {
        color: Colors.text,
        fontSize: Font.title,
        fontWeight: '800',
        letterSpacing: -0.8,
    },

    settingCard: {
        backgroundColor: Colors.card,

        borderRadius: Radius.large,

        paddingVertical: 20,
        paddingHorizontal: 20,

        marginBottom: 16,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderWidth: 1,
        borderColor: Colors.border,

        ...Shadow.card,
    },

    cardLeft: {
        flex: 1,
    },

    cardTitle: {
        color: Colors.text,
        fontSize: Font.body,
        fontWeight: '700',
    },

    cardValue: {
        marginTop: 6,

        color: Colors.textLight,
        fontSize: Font.small,
    },

    arrow: {
        color: Colors.textLight,
        fontSize: 28,
        fontWeight: '400',
    },

    section: {
        marginTop: 12,
        marginBottom: 8,
    },

    sectionTitle: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 6,
    },

    footer: {
        marginTop: 'auto',
        marginBottom: 40,
        alignItems: 'center',
    },

    footerText: {
        color: Colors.textLight,
        fontSize: 13,
    },
    
    optionsCard: {
        backgroundColor: Colors.card,
        borderRadius: Radius.large,
        marginTop: -6,
        marginBottom: 14,
        overflow: 'hidden',
    
        ...Shadow.card,
    },
    
    optionButton: {
        paddingVertical: 16,
        paddingHorizontal: 22,
    
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    
    optionText: {
        color: Colors.textSecondary,
        fontSize: Font.body,
        fontWeight: '600',
    },
});

export default styles;