import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7FC',
        paddingHorizontal: 20,
        paddingTop: 64,
    },

    content: {
        paddingBottom: 32,
    },

    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },

    backButton: {
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

    backButtonText: {
        color: '#625B77',
        fontSize: 32,
        fontWeight: '400',
        marginTop: -5,
    },

    title: {
        color: '#2D2A3A',
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.8,
    },

    topBarSpacer: {
        width: 46,
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

    wordCard: {
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

    wordCardCorrect: {
        backgroundColor: '#D9F3E3',
        borderColor: '#A9DDBD',
    },

    wordCardWrong: {
        backgroundColor: '#FFE5E8',
        borderColor: '#F2B9C1',
    },

    word: {
        color: '#2D2A3A',
        fontSize: 42,
        fontWeight: '800',
        textAlign: 'center',
    },

    romaji: {
        color: '#827D94',
        fontSize: 17,
        marginTop: 6,
        textAlign: 'center',
    },

    wordHint: {
        color: '#827D94',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
    },

    loadingText: {
        color: '#625B77',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },

    errorCard: {
        marginTop: 18,
        backgroundColor: '#FFF0F1',
        borderRadius: 20,
        padding: 16,
    },

    errorText: {
        color: '#B94B5B',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
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

    captureButtonDisabled: {
        opacity: 0.6,
    },

    captureInner: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#A99BF7',
        alignItems: 'center',
        justifyContent: 'center',
    },

    captureIcon: {
        color: '#FFFFFF',
        fontSize: 26,
        lineHeight: 26,
    },

    correctBadge: {
        alignSelf: 'center',
        marginTop: 18,
        backgroundColor: '#E7F7EE',
        borderRadius: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    correctText: {
        color: '#368A5D',
        fontSize: 17,
        fontWeight: '800',
    },

    wrongBadge: {
        alignSelf: 'center',
        marginTop: 18,
        backgroundColor: '#FFF0F1',
        borderRadius: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    wrongText: {
        color: '#B94B5B',
        fontSize: 16,
        fontWeight: '800',
    },

    permissionContainer: {
        flex: 1,
        backgroundColor: '#F8F7FC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    permissionTitle: {
        color: '#2D2A3A',
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
    },

    permissionText: {
        color: '#625B77',
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center',
        marginTop: 12,
    },

    permissionButton: {
        backgroundColor: '#A99BF7',
        paddingHorizontal: 22,
        paddingVertical: 14,
        borderRadius: 16,
        marginTop: 22,
    },

    permissionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },

    captureButtonDisabled: {
        opacity: 0.6
    }
});

export default styles;