import { StyleSheet } from "react-native";
import { COLORS } from "../colors";

export const styles = StyleSheet.create({
	label: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 16,
		color: COLORS.black,
		marginBottom: 5,
		marginLeft: 5,
		fontWeight: "400",
	},
	inputWrapper: {
		position: "relative",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: 'center',
		width: "100%",
		// gap: 10,
	},
	rightIcon: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		width: 30,
		height: 30,
		right: 10,
		zIndex: 2,
	},
	leftIcon: {
		justifyContent: "center",
		alignItems: "center",
		width: 30,
		height: 30,
		zIndex: 2,
		position: 'absolute',
		left: 10,
	},
	ifLeftIcon: {
		paddingLeft: 40,
		// backgroundColor: ''
	},
	input: {
		flex: 1,
		paddingLeft: 10,
		minHeight: 42,
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		borderRadius: 10,
		fontSize: 16,
		fontWeight: "400",
		fontFamily: "GTWalsheimPro-Regular",
		backgroundColor: COLORS.white,
	},
	inputWithLeftIcon: {
		paddingLeft: 60,
	},
	// inputWithRightIcon: {
	// 	paddingRight: 60,
	// },
	errorText: {
		color: COLORS.error,
		fontSize: 14,
		flexShrink: 1,
		fontWeight: "500",
	},
	errorBlock: {
		gap: 2,
		flexDirection: "row",
		position: "static",
	},
	codeFieldRoot: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
	},
	codeCell: {
		width: 42,
		height: 42,
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		borderRadius: 10,
		backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
	},
	codeCellFocused: {
		borderColor: COLORS.plum,
	},
	codeCellText: {
		fontSize: 18,
		color: COLORS.black,
		fontFamily: "GTWalsheimPro-Regular",
	},
});
