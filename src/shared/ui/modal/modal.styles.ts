import { StyleSheet } from "react-native";
import { COLORS } from "../colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	modalContent: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		padding: 20,
		width: "100%",
		height: 'auto',
		gap: 10,
	},
	title: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 24,
		color: COLORS.black,
		fontWeight: "700",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	closeButton: {
		padding: 5,
	},




	centerModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},

	centerModalContent: {
		backgroundColor: COLORS.white,
		borderRadius: 30,
		padding: 20,
		width: "90%",
		height: 'auto',
		gap: 10,
	},
});
