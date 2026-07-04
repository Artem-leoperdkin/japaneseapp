import { StyleSheet } from "react-native";

import {
    Colors,
    Radius,
    Font,
    Shadow,
    Spacing,
} from './theme.js'

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
        marginBottom: 24,
    },
    
    logo: {
        color: Colors.text,
        fontSize: Font.title,
        fontWeight: '800',
        letterSpacing: -0.8,
    },
    
    topActions: {
        flexDirection: 'row',
        gap: 10,
    },
    
    topIconButton: {
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
    
    topIcon: {
        color: Colors.textSecondary,
        fontSize: 23,
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
    
    hint: {
        color: Colors.textLight,
        fontSize: Font.small,
        textAlign: 'center',
        marginTop: 18,
    },
    
    controls: {
        marginTop: 30,
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
        borderRadius: 44,
        backgroundColor: Colors.primaryLight,
        borderWidth: 3,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    
        ...Shadow.floating
    },
    
    captureInner: {
        width: 68,
        height: 68,
        borderRadius: Radius.round,
        backgroundColor: Colors.primary,
    },
    
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: Radius.camera,
        backgroundColor: Colors.cameraBackground,
        borderWidth: 2,
        borderColor: Colors.card,
    },
    
    previewFrame: {
        width: '100%',
        aspectRatio: 0.82,
        borderRadius: Radius.camera,
        overflow: 'visible',
    },
        
    retakeCircleButton: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 46,
        height: 46,
        borderRadius: Radius.round,
        backgroundColor: 'rgba(255,255,255,0.92)',
        alignItems: 'center',
        justifyContent: 'center',
        
        ...Shadow.card,
    },
        
    retakeCircleIcon: {
        color: Colors.textSecondary,
        fontSize: 26,
        fontWeight: '700',
    },
    
    loadingText: {
        color: Colors.textSecondary,
        fontSize: Font.body,
        fontWeight: '700',
        textAlign: 'center',
    },
    
    loadingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 22,
    },
        
    loadingEmoji: {
        color: Colors.primary,
        fontSize: 22,
    },
    
    resultBox: {
        alignItems: 'center',
        backgroundColor: Colors.card,
        borderRadius: Radius.large,
        borderWidth: 1,
        borderColor: Colors.border,
        marginTop: 18,
        paddingVertical: 20,
        paddingHorizontal: 24,
    
        ...Shadow.card,
    },
    
    japanese: {
        color: Colors.text,
        fontSize: Font.huge,
        fontWeight: '800',
    },
    
    romaji: {
        color: Colors.textLight,
        fontSize: Font.body,
        marginTop: 6,
    },
    
    translation: {
        color: Colors.textSecondary,
        fontSize: 19,
        marginTop: 10,
        textAlign: 'center',
    },
    
    saveButton: {
        backgroundColor: Colors.primary,
        borderRadius: Radius.medium,
        paddingVertical: 16,
        marginTop: 18,
    
        ...Shadow.floating,
    },
    
    saveButtonText: {
        color: Colors.card,
        fontSize: Font.body,
        fontWeight: '800',
        textAlign: 'center',
    },
    
    retakeButton: {
        alignItems: 'center',
        marginTop: 18,
    },
    
    retakeButtonText: {
        color: '#756E88',
        fontSize: Font.body,
        fontWeight: '600',
    },
    
    quizButton: {
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.medium,
        paddingVertical: 16,
        marginTop: 26,
        marginBottom: 26,

        ...Shadow.card,
    },
    
    quizButtonText: {
        color: Colors.textSecondary,
        fontSize: Font.body,
        fontWeight: '700',
        textAlign: 'center',
    },
    
    permissionContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    
    permissionText: {
        color: Colors.textSecondary,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    
    permissionButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 22,
        paddingVertical: 14,
        borderRadius: Radius.medium,

        ...Shadow.floating,
    },
    
    permissionButtonText: {
        color: Colors.card,
        fontSize: Font.body,
        fontWeight: '800',
        },
    
        content: {
        paddingBottom: 26,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: Colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },

    wordModalCard: {
        width: '100%',
        maxWidth: 380,
        backgroundColor: Colors.card,
        borderRadius: Radius.xl,
        padding: 16,

        ...Shadow.modal,
    },

    modalPhotoFrame: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: Radius.medium,
        overflow: 'hidden',
        backgroundColor: Colors.cameraBackground,
    },

    modalPhoto: {
        width: '100%',
        height: '100%',
    },

    modalWord: {
        marginTop: 18,
        color: Colors.text,
        fontSize: 38,
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: 44,
    },

    modalRomaji: {
        marginTop: 7,
        color: Colors.textLight,
        fontSize: Font.body,
        textAlign: 'center',
    },

    modalTranslation: {
        marginTop: 8,
        color: Colors.textSecondary,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },

    modalButtons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 22,
    },

    retakeModalButton: {
        flex: 1,
        minHeight: 54,
        borderRadius: Radius.medium,
        backgroundColor: Colors.cameraBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },

    retakeModalText: {
        color: Colors.textSecondary,
        fontSize: 13,
        fontWeight: '700',
    },

    saveModalButton: {
        flex: 1,
        minHeight: 54,
        borderRadius: Radius.medium,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',

        ...Shadow.floating,
    },

    saveModalText: {
        color: Colors.card,
        fontSize: Font.body,
        fontWeight: '800',
    },

    analyzingScreen: {
        minHeight: 420,
        alignItems: 'center',
        justifyContent: 'center',
    },

    analyzingText: {
        color: Colors.textSecondary,
        fontSize: Font.body,
        fontWeight: '700',
    },
});

export default styles;