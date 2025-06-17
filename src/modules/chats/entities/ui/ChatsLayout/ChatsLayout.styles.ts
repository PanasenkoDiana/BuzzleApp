import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/ui/colors";

export const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 500,
        textAlign: "center",
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: COLORS.white,
    },
    navButtom: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: "33%",
    },
    selectedBlock: {
        width: "100%",
        height: 2,
        backgroundColor: COLORS.black,
        position: "absolute",
        top: 0,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
    }
})