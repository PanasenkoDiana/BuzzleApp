import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/ui/colors";
// import { COLORS } from "../../../../shared/ui/colors";

export const styles = StyleSheet.create({
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
})