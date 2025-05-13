import { StyleSheet } from "react-native"
import { COLORS } from '../colors'

export const styles = StyleSheet.create({
    button: {
        width: 311,
        height: 52,
        borderRadius: 1234,
        padding: 16,
        paddingHorizontal: 24,
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.darkPlum
    },
    disabled: {
        backgroundColor: COLORS.darkPlum ,
        opacity: 0.5
    }
})