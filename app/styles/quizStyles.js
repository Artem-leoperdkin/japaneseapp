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

    content: {
        paddingBottom: 32,
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.lg + 4,
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
        fontSize: Font.large,
        fontWeight: '400',
        marginTop: -5,
    },

    title: {
        color: Colors.text,
        fontSize: Font.title,
        fontWeight: '800',
        letterSpacing: -0.8,
    },

    topBarSpacer: {
        width: 46,
    },

    cameraFrame: {
        width: '100%',
        aspectRatio: 0.82,
        borderRadius: Radius.camera,
        overflow: 'hidden',
        backgroundColor: Colors.cameraBackground,
        borderWidth: 2,
        borderColor: Colors.card,

        ...Shadow.floating,
    },

    camera: {
        flex: 1,
    },

    wordCard: {
        alignItems: 'center',
        backgroundColor: Colors.card,
        borderRadius: Radius.large,
        borderWidth: 1,
        borderColor: Colors.border,
        marginTop: Spacing.lg - 2,
        paddingVertical: Spacing.lg,
        paddingHorizontal: 24,

        ...Shadow.card,
    },

    wordCardCorrect: {
        backgroundColor: Colors.success,
        borderColor: Colors.success,
    },

    wordCardWrong: {
        backgroundColor: Colors.error,
        borderColor: Colors.error,
    },

    word: {
        color: Colors.text,
        fontSize: Font.huge,
        fontWeight: '800',
        textAlign: 'center',
    },

    romaji: {
        color: Colors.textLight,
        fontSize: Font.body,
        marginTop: Spacing.xs,
        textAlign: 'center',
    },

    wordHint: {
        color: Colors.textLight,
        fontSize: Font.small,
        textAlign: 'center',
        marginTop: Spacing.sm,
    },

    loadingText: {
        color: Colors.textSecondary,
        fontSize: Font.body,
        fontWeight: '700',
        textAlign: 'center',
    },

    errorCard: {
        marginTop: Spacing.lg - 2,
        backgroundColor: Colors.error,
        borderRadius: Radius.medium,
        padding: Spacing.md,
    },

    errorText: {
        color: Colors.errorText,
        textAlign: 'center',
        fontSize: Font.body,
        fontWeight: '700',
    },

    controls: {
        marginTop: Spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    sideButton: {
        width: 62,
        height: 62,
        borderRadius: Radius.round,
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',

        ...Shadow.card,
    },

    sideButtonText: {
        color: Colors.textSecondary,
        fontSize: 31,
        fontWeight: '500',
    },

    flashActive: {
        color: Colors.primaryDark,
    },

    captureButton: {
        width: 88,
        height: 88,
        borderRadius: Radius.round,
        backgroundColor: Colors.primaryLight,
        borderWidth: 3,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',

        ...Shadow.floating,
    },

    captureButtonDisabled: {
        opacity: 0.6,
    },

    captureInner: {
        width: 68,
        height: 68,
        borderRadius: Radius.round,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    captureIcon: {
        color: Colors.
        card,
        fontSize: 26,
        lineHeight: 26,
    },

    correctBadge: {
        alignSelf: 'center',
        marginTop: Spacing.lg - 2,
        backgroundColor: Colors.success,
        borderRadius: Radius.medium,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.lg,
    },

    correctText: {
        color: Colors.successText,
        fontSize: Font.body,
        fontWeight: '800',
    },

    wrongBadge: {
        alignSelf: 'center',
        marginTop: Spacing.lg - 2,
        backgroundColor: Colors.error,
        borderRadius: Radius.medium,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.lg,
    },

    wrongText: {
        color: Colors.errorText,
        fontSize: Font.body,
        fontWeight: '800',
    },

    permissionContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },

    permissionTitle: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
    },

    permissionText: {
        color: Colors.textSecondary,
        fontSize: Font.body,
        lineHeight: 22,
        textAlign: 'center',
        marginTop: Spacing.sm + 2,
    },

    permissionButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 22,
        paddingVertical: 14,
        borderRadius: Radius.medium,
        marginTop: 22,

        ...Shadow.floating,
    },

    permissionButtonText: {
        color: Colors.card,
        fontSize: Font.body,
        fontWeight: '800',
    },

    content: {
        flexGrow: 1,
        paddingBottom: Spacing.xl,
    },
});

export default styles;