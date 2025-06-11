import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/ui/colors";

export const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        gap: 5,
        justifyContent: "center",
    },
    navButtom: {
        
    },
    navContainer: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center"
    },
    selectedBlock: {
        borderBottomColor: COLORS.darkPlum,
        borderBottomWidth: 2,
    },
    navText: {
        fontSize: 19,
        fontWeight: "bold",
        textAlign: "center"
    }

})