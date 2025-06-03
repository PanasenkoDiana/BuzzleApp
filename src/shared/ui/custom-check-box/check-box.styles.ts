import { StyleSheet } from "react-native";
import { COLORS } from "../colors";

export const styles = StyleSheet.create({
    container: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 4,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: COLORS.lightGray,
		alignItems: "center",
		justifyContent: "center",
	},
	checkboxChecked: {
		backgroundColor: COLORS.white,
	},
	label: {
		marginLeft: 10,
		color: COLORS.plum,
		fontSize: 16,
	},
})