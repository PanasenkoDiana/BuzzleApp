import { StyleSheet } from "react-native"
import { COLORS } from '../colors'

export const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 50,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.button,
        borderWidth: 1,
        borderColor: COLORS.button,
    },
    disabled: {
        borderWidth: 2,
        borderColor: COLORS.button,
        backgroundColor: COLORS.white,
        opacity: 0.5
    }
})