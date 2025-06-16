import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/ui/colors";

export const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        fontWeight: 500,
        textAlign: "center",
    },
    container: {

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
    },
    selectedBlock: {
        borderTopWidth: 2,
        borderTopColor: COLORS.black
    }
})