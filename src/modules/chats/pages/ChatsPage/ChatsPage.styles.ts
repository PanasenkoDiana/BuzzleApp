import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";

export const styles = StyleSheet.create({
	container: {
        flex: 1,
		flexDirection: "column",
		borderWidth: 1,
		borderRadius: 10,
        padding: 10,
		borderColor: COLORS.lightGray,
		backgroundColor: COLORS.white,
	},
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.lightGray,
    },
    
});
