import { StyleSheet } from 'react-native';
import {
    Colors,
    Radius,
    Font,
    Shadow,
    Spacing,
} from './theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.lg,
        paddingTop: 64,
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
    },

    backButton: {
        width: 46,
        height: 46,
        borderRadius: Radius.round,
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',

        ...Shadow.card,
    },

    backButtonText: {
        color: Colors.textSecondary,
        fontSize: 28,
        fontWeight: '700',
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

    list: {
        paddingBottom: 30,
    },

    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },

    emptyBox: {
        backgroundColor: Colors.card,
        borderRadius: Radius.large,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 28,
        alignItems: 'center',

        ...Shadow.card,
    },

    emptyTitle: {
        color: Colors.text,
        fontSize: 22,
        fontWeight: '800',
    },

    emptyText: {
        color: Colors.textLight,
        fontSize: Font.small,
        textAlign: 'center',
        marginTop: Spacing.sm,
        lineHeight: 22,
    },
});

export default styles;