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

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.28)',
    },
    
    modalSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        padding: 22,
        paddingBottom: 34,
    },
    
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#2D2A3A',
        marginBottom: 18,
        textAlign: 'center',
    },
    
    modalOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    
        paddingVertical: 18,
    
        borderBottomWidth: 1,
        borderBottomColor: '#EFEAF8',
    },
    
    modalOptionText: {
        fontSize: 18,
        color: '#2D2A3A',
    },
    
    check: {
        fontSize: 20,
        color: '#A99BF7',
        fontWeight: '800',
    },
    
    cancelButton: {
        marginTop: 18,
        backgroundColor: '#F5F2FC',
        borderRadius: 16,
        paddingVertical: 16,
    },
    
    cancelText: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '700',
        color: '#625B77',
    },

    popupCard: {
        marginTop: -6,
        marginBottom: 16,
    
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
    
        borderWidth: 1,
        borderColor: '#E8E5F0',
    
        overflow: 'hidden',
    
        shadowColor: '#5C5670',
        shadowOpacity: 0.10,
        shadowRadius: 14,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        elevation: 4,
    },
    
    popupItem: {
        height: 58,
    
        paddingHorizontal: 22,
    
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    
    popupText: {
        color: '#2D2A3A',
        fontSize: 17,
        fontWeight: '600',
    },
    
    check: {
        color: '#A99BF7',
        fontSize: 22,
        fontWeight: '800',
    },
    
    popupDivider: {
        height: 1,
        backgroundColor: '#ECE8F3',
        marginLeft: 22,
    },
});

export default styles;