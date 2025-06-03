import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    friendInfo: {
        flexDirection: "column",
        gap: 10
    },
    names: {
        flexDirection: "column",
        gap: 5
    },
    name: {
        fontWeight: "bold"
    },
    buttons: {
        gap: 5
    },
    button: {
        borderRadius: "100%"
    }
})