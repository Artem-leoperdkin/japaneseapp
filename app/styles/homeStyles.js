import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7FC',
        paddingHorizontal: 20,
        paddingTop: 64,
    },
    
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    
    logo: {
        color: '#2D2A3A',
        fontSize: 28,
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
        borderRadius: 23,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E5F0',
        alignItems: 'center',
        justifyContent: 'center',
    
        shadowColor: '#5C5670',
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 2,
    },
    
    topIcon: {
        color: '#625B77',
        fontSize: 23,
    },
    
    cameraFrame: {
        width: '100%',
        aspectRatio: 0.82,
        borderRadius: 34,
        overflow: 'hidden',
        backgroundColor: '#EDEAF5',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    
        shadowColor: '#5C5670',
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        elevation: 5,
    },
    
    camera: {
        flex: 1,
    },
    
    hint: {
        color: '#827D94',
        fontSize: 15,
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
        borderRadius: 31,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E5F0',
        justifyContent: 'center',
        alignItems: 'center',
    
        shadowColor: '#5C5670',
        shadowOpacity: 0.07,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 2,
    },
    
    sideButtonText: {
        color: '#625B77',
        fontSize: 31,
        fontWeight: '500',
    },
    
    flashActive: {
        color: '#8D7FE8',
    },
    
    captureButton: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: '#EAE7FF',
        borderWidth: 3,
        borderColor: '#A99BF7',
        justifyContent: 'center',
        alignItems: 'center',
    
        shadowColor: '#8D7FE8',
        shadowOpacity: 0.22,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        elevation: 5,
    },
    
    captureInner: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#A99BF7',
    },
    
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 34,
        backgroundColor: '#EDEAF5',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    
    previewFrame: {
        width: '100%',
        aspectRatio: 0.82,
        borderRadius: 34,
        overflow: 'visible',
    },
        
    retakeCircleButton: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: 'rgba(255,255,255,0.92)',
        alignItems: 'center',
        justifyContent: 'center',
        
        shadowColor: '#2D2A3A',
        shadowOpacity: 0.16,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 4,
    },
        
    retakeCircleIcon: {
        color: '#625B77',
        fontSize: 26,
        fontWeight: '700',
    },
    
    loadingText: {
        color: '#625B77',
        fontSize: 16,
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
        color: '#A99BF7',
        fontSize: 22,
    },
    
    resultBox: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E8E5F0',
        marginTop: 18,
        paddingVertical: 20,
        paddingHorizontal: 24,
    
        shadowColor: '#5C5670',
        shadowOpacity: 0.07,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        elevation: 3,
    },
    
    japanese: {
        color: '#2D2A3A',
        fontSize: 42,
        fontWeight: '800',
    },
    
    romaji: {
        color: '#827D94',
        fontSize: 17,
        marginTop: 6,
    },
    
    translation: {
        color: '#4B465A',
        fontSize: 19,
        marginTop: 10,
        textAlign: 'center',
    },
    
    saveButton: {
        backgroundColor: '#A99BF7',
        borderRadius: 18,
        paddingVertical: 16,
        marginTop: 18,
    
        shadowColor: '#8D7FE8',
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        elevation: 4,
    },
    
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
        textAlign: 'center',
    },
    
    retakeButton: {
        alignItems: 'center',
        marginTop: 18,
    },
    
    retakeButtonText: {
        color: '#756E88',
        fontSize: 16,
        fontWeight: '600',
    },
    
    quizButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E5F0',
        borderRadius: 18,
        paddingVertical: 16,
        marginTop: 26,
        marginBottom: 26,
    },
    
    quizButtonText: {
        color: '#625B77',
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
    },
    
    permissionContainer: {
        flex: 1,
        backgroundColor: '#F8F7FC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    
    permissionText: {
        color: '#2D2A3A',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    
    permissionButton: {
        backgroundColor: '#A99BF7',
        paddingHorizontal: 22,
        paddingVertical: 14,
        borderRadius: 16,
    },
    
    permissionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        },
    
        content: {
        paddingBottom: 26,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(24, 20, 38, 0.68)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },

    wordModalCard: {
        width: '100%',
        maxWidth: 380,
        backgroundColor: '#FFFDFE',
        borderRadius: 30,
        padding: 16,

        shadowColor: '#171225',
        shadowOpacity: 0.32,
        shadowRadius: 28,
        shadowOffset: {
            width: 0,
            height: 14,
        },
        elevation: 12,
    },

    modalPhotoFrame: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#EDEAF5',
    },

    modalPhoto: {
        width: '100%',
        height: '100%',
    },

    modalWord: {
        marginTop: 18,
        color: '#2E2A42',
        fontSize: 38,
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: 44,
    },

    modalRomaji: {
        marginTop: 7,
        color: '#8B849E',
        fontSize: 17,
        textAlign: 'center',
    },

    modalTranslation: {
        marginTop: 8,
        color: '#625B77',
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
        borderRadius: 16,
        backgroundColor: '#F0EDF7',
        alignItems: 'center',
        justifyContent: 'center',
    },

    retakeModalText: {
        color: '#625B77',
        fontSize: 15,
        fontWeight: '700',
    },

    saveModalButton: {
        flex: 1,
        minHeight: 54,
        borderRadius: 16,
        backgroundColor: '#A99BF7',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#8F80E8',
        shadowOpacity: 0.3,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        elevation: 5,
    },

    saveModalText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
});

export default styles;