import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F7FC',
    },

    title: {
        marginTop: 55,
        fontSize: 30,
        fontWeight: '800',
        color: '#2D2A3A',
        marginBottom: 8,
    },

    counter: {
        fontSize: 16,
        color: '#827D94',
        marginBottom: 14,
    },

    button: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E5F0',
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 16,
        marginBottom: 18,
        width: 140,
    },

    buttonText: {
        color: '#625B77',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },

    list: {
        paddingBottom: 40,
    },

    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },

    emptyBox: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E8E5F0',
        borderRadius: 24,
        padding: 26,
        alignItems: 'center',
    },

    emptyTitle: {
        color: '#2D2A3A',
        fontSize: 20,
        fontWeight: '800',
    },

    emptyText: {
        color: '#827D94',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 21,
    },
});