import { StyleSheet } from "react-native"
import { COLORS } from "../../../../../../shared/ui/colors";

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
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        gap: 10
    },
    button: {
        borderColor: COLORS.darkPlum,
        padding: 10,
        borderWidth: 2,
        borderRadius: 25
    },
    leftButton: {
        
    },
    leftButtonText: {
        color: COLORS.darkPlum,
    },
    rightButton: {
        backgroundColor: COLORS.darkPlum
    },
    rightButtonText: {
        color: COLORS.white,
    },
})