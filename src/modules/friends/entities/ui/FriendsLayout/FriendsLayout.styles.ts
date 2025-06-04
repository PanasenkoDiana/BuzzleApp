import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/ui/colors";

export const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",
        gap: 10
    },
    navButtom: {
        
    },
    selectedBlock: {
        borderBottomColor: COLORS.darkPlum,
        borderBottomWidth: 2,
    },
    navText: {
        fontSize: 20,
        fontWeight: "bold"
    }

})