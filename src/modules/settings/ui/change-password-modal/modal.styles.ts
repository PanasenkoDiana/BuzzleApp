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
        // gap: 5,
        flexDirection: "column",
    },
    dismissButton: {
        borderColor: COLORS.darkPlum,
        borderWidth: 1,
        borderRadius: 50,
        height: 40,
        padding: 10,
        width: '48%',
        // flex: 0.4,
        justifyContent:'center',
        alignItems: 'center'
    },
    dismissButtonTitle: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 14,
        fontWeight: '500',
        alignSelf: 'center',
        color: COLORS.darkPlum
    },
    createButton: {
        borderRadius: 50,
        padding: 10,
        width: '48%',
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        // flex: 0.49,
        backgroundColor: COLORS.darkPlum
    },
    createButtonTitle: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 14,
        alignSelf: 'center',
        fontWeight: '500',
        color: COLORS.white
    },
    verifyModalTitle: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 34,
        textAlign: 'center',
        fontWeight: '500',
        width: '100%',
        color: COLORS.black,    
    },
    verifyModalText: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
        fontWeight: '500',
        color: COLORS.black,    
    }
});