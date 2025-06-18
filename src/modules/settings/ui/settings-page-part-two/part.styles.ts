import { StyleSheet } from "react-native"
import { COLORS } from "../../../../shared/ui/colors"

export const styles = StyleSheet.create({
	changeSettingsBlock: {
		width: "100%",
		backgroundColor: COLORS.white,
		borderColor: COLORS.lightGray,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 10,
        padding: 10,
	},



	PasswordChangeBlock: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
	},

	PasswordChangeTitle: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 18,
		fontWeight: "500",
	},

	PasswordChangeInputView: {
		width: "100%",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		gap: 10,
	}


})
