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
        borderTopWidth: 2,
        borderTopColor: COLORS.black
    },
    navText: {
        fontSize: 19,
        fontWeight: 500,
        textAlign: "center",
    }

})