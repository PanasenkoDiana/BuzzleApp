import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";

export const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingHorizontal: 20,
		gap: 20,
	},

	title: {
		alignSelf: 'center',
		fontFamily: "GTWalsheimPro-Bold", // или "GTWalsheimPro-Regular", если нет Bold
		fontSize: 24,
		color: COLORS.darkPlum,
	},

	searchBar: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		borderRadius: 100,
		paddingHorizontal: 16,
		paddingVertical: 10,
		gap: 8,
	},

	searchInput: {
		flex: 1,
		fontSize: 16,
		color: COLORS.black,
		fontFamily: "GTWalsheimPro-Regular",
	},

	selectText: {
		fontFamily: "GTWalsheimPro-Regular",
		color: COLORS.gray,
		fontSize: 14,
		marginTop: -10,
		marginBottom: 5,
	},

	userCard: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightGray,
		position: 'relative',
	},

	userText: {
		marginLeft: 12,
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 16,
		color: COLORS.black,
	},

	checkBoxWrapper: {
		position: 'absolute',
		right: 10,
	},
});
