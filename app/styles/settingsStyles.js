import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7FC',
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
        borderRadius: 23,
        backgroundColor: '#FFFFFF',

        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: '#E8E5F0',

        shadowColor: '#5C5670',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },

        elevation: 3,
    },

    backButtonText: {
        fontSize: 28,
        color: '#625B77',
        fontWeight: '600',
    },

    topBarSpacer: {
        width: 46,
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#2D2A3A',
        letterSpacing: -0.8,
    },

    settingCard: {
        backgroundColor: '#FFFFFF',

        borderRadius: 22,

        paddingVertical: 20,
        paddingHorizontal: 20,

        marginBottom: 16,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        borderWidth: 1,
        borderColor: '#ECE8F4',

        shadowColor: '#5C5670',
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 5,
        },

        elevation: 2,
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#2D2A3A',
    },

    cardValue: {
        marginTop: 6,
        fontSize: 15,
        color: '#8A859B',
    },

    arrow: {
        fontSize: 28,
        color: '#B3ACC8',
        fontWeight: '400',
    },
});

export default styles;