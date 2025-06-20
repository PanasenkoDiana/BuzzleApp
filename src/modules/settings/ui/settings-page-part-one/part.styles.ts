import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";


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
		gap: 20,
	},

	profileAvatar: {
		flexDirection: "column",
		gap: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	profileAvatarImage: {
		width: 100,
		height: 100,
		borderRadius: 100,
		backgroundColor: COLORS.black,
	},

	profileAvatarName: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 24,
		fontWeight: "700",
		color: COLORS.black,
	},

	profileAvatarIndex: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 16,
		fontWeight: "500",
		color: COLORS.black,
		alignContent: 'center',
	},
})