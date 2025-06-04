import { StyleSheet } from "react-native"
import { COLORS } from "../../../../../shared/ui/colors"

export const styles = StyleSheet.create({
    text: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    },
    container: {
        gap: 5,
        justifyContent: "center",
        alignContent: "center"
    },
    button: {
        borderColor: COLORS.darkPlum,
        backgroundColor: COLORS.darkPlum,
        padding: 10,
        borderWidth: 2,
        borderRadius: 25
    },
    buttonText: {
        color: COLORS.white,
    }
})