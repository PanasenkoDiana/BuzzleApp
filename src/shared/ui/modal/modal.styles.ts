import { StyleSheet } from "react-native";
import { COLORS } from "../colors";

export const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 20,
		width: "80%",
		gap: 10,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	closeButton: {
		padding: 5,
	},
	content: {
		backgroundColor: COLORS.white,
		padding: 20,
		gap: 10,
	},
});
