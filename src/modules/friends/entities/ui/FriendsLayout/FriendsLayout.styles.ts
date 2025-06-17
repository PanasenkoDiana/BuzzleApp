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
        width: "100%",
        height: 2,
        backgroundColor: COLORS.black,
        position: "absolute",
        top: 0,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
    },
    navText: {
        fontSize: 19,
        fontWeight: 500,
        textAlign: "center",
    }
})