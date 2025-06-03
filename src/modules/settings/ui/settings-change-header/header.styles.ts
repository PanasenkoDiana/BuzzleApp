import { StyleSheet } from "react-native"
import { COLORS } from "../../../../shared/ui/colors"

export const styles = StyleSheet.create({
	changeSettingsHeader: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: 'center',
	},

	changeSettingsTitle: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 16,
		fontWeight: "500",
		color: COLORS.black,
	},

	changeSettingsIconView: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
		borderColor: COLORS.darkPlum,
		borderWidth: 1,
		borderRadius: 100,
	},
})
