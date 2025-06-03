import { StyleSheet } from "react-native"
import { COLORS } from "../../../../shared/ui/colors"

export const styles = StyleSheet.create({
	container: {
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

    checkBoxView: {
		flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%'
	},

	nameCheckBoxText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16, 
        fontWeight: 500,
        color: COLORS.gray

    },

	signatureView: {
		// обертка для 
        width: '100%',
        height: 70,
        backgroundColor: COLORS.black 
    },

	signatureImage: {
		// стиль изображения подписи
	},
})
