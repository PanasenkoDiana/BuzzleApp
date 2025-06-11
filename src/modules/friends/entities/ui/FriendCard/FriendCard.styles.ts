import { StyleSheet } from "react-native"
import { COLORS } from "../../../../../shared/ui/colors"

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20
    },
    friendInfo: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    names: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    name: {
        fontWeight: "bold",
        fontSize: 20
    },
    username: {
        fontWeight: "bold",
        fontSize: 15
    },
    buttons: {
        flexDirection: "row",
        gap: 10
    },
    button: {
        borderColor: COLORS.darkPlum,
        padding: 10,
        borderWidth: 2,
        borderRadius: 25
    },
    leftButton: {
        backgroundColor: COLORS.darkPlum
    },
    leftButtonText: {
        color: COLORS.white,
        fontWeight: "bold"
    },
    rightButton: {
        
    },
    rightButtonText: {
        color: COLORS.darkPlum,
        fontWeight: "bold"
    }
})