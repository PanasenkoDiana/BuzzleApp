import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/ui/colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 24,
        // margin: 20,
		width: '90%',
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		// paddingBottom: 44,
		// paddingTop: 44,
		backgroundColor: COLORS.white,
	},
	pageText: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 24,
		fontWeight: "500",
		color: COLORS.black,
		alignItems: "center",
		justifyContent: "center",
	},
	transitionText: {
		fontFamily: "GTWalsheimPro-Regular",
		fontWeight: "500",
		fontSize: 24,
	},
	transitionButton: {
		borderBottomWidth: 2,
		borderBottomColor: COLORS.white,
	},
	activeTransitionButton: {
		fontFamily: "GTWalsheimPro-Regular",
		fontWeight: "700",
		fontSize: 24,
	},
	activeTransitionText: {
		borderBottomColor: "black",
		borderBottomWidth: 2,
	},
	buttonContainer: {
		justifyContent: "center",
		alignItems: "center"
	},
	transitionContainer: {
		flexDirection: "row",
		gap: 20,
		alignItems: "center",
		justifyContent: "center",
	}
});
