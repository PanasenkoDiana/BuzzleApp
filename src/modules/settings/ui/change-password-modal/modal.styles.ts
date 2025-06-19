import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";


export const styles = StyleSheet.create({
    navPassword: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    navPasswordTitle: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.black,
    },
    navPasswordButton: {
        borderColor: COLORS.darkPlum,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: COLORS.plum,
        padding: 10,
        gap: 15,
    },
    navPasswordButtonText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 14,
        fontWeight: "500",
        color: COLORS.darkPlum
    },
    InputPasswordView: {
        width: "100%",
        gap: 15,
        flexDirection: "column",
    },
    dismissButton: {
        borderColor: COLORS.darkPlum,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10
    },
    dismissButtonTitle: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.darkPlum
    },
    createButton: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: COLORS.darkPlum
    },
    createButtonTitle: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.white
    },
    verifyModalTitle: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 34,
        fontWeight: '500',
        color: COLORS.black,    
    },
    verifyModalText: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.black,    
    }
});