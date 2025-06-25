import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },

    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 15
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100
    },

    lastMessageBlock: {
        flexDirection: 'column',
        gap: 8,
        width: '80%'
    },

    lastMessageName: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        fontWeight: '700'
    },
    
    lastMessageText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 14,
        fontWeight: '400'
    },
    time: {
        // position: 'absolute',
        // right: 5,
        // top: 5,
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 14,
        fontWeight: '400',
        color: COLORS.lightGray
    }
});
