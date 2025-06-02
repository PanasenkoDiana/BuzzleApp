import { StyleSheet } from "react-native"
import { COLORS } from "../../../../shared/ui/colors"

export const styles = StyleSheet.create({
	submitButton: {
		height: 40,
		backgroundColor: COLORS.darkPlum,
		borderRadius: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
        // width: '50%',
        alignContent: 'center',
        alignSelf: 'flex-end',
		// gap: 10,
	},

	submitButtonText: {
		fontWeight: "500",
		fontSize: 14,
        alignSelf: 'center',
		fontFamily: "GTWalsheimPro-Regular",
		color: COLORS.white,
	},

    variantText:{
        fontWeight: "400",
		fontSize: 12,
		fontFamily: "GTWalsheimPro-Regular",
		color: COLORS.black,
    },
})
