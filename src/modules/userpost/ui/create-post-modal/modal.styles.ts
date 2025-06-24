import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10
	},

	title: {
		fontSize: 20,
		fontWeight: "700",
		color: COLORS.darkPlum,
		marginBottom: 20,
		textAlign: "center",
	},
	

	scrollContent: {
		flexGrow: 1,
		paddingBottom: 50,
	},

	innerContent: {
		paddingHorizontal: 16,
	},

	imageWrapper: {
		marginVertical: 10,
		position: "relative",
		width: "100%",
		aspectRatio: 16 / 9,
	},

	image: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ccc",
		resizeMode: "cover",
	},

	removeImageButton: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: "rgba(255, 255, 255, 1)",
		borderColor: COLORS.darkPlum,
		borderWidth: 2,
		borderRadius: 15,
		padding: 5,
		zIndex: 1,
	},

	bottomContainer: {
		width: "100%",
		padding: 20,
		justifyContent: "flex-end",
		flexDirection: "row",
		gap: 10,
	},

	optionDiv: {
		width: 40,
		height: 40,
		borderColor: COLORS.black,
		borderWidth: 1,
		borderRadius: 1000,
		justifyContent: "center",
		alignItems: "center",
	},

	submitButton: {
		height: 40,
		backgroundColor: COLORS.darkPlum,
		borderRadius: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		gap: 10,
	},

	submitButtonText: {
		fontWeight: "500",
		fontSize: 14,
		fontFamily: "GTWalsheimPro-Regular",
		color: COLORS.white,
	},
});
