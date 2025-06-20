import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../shared/ui/colors";

export const styles = StyleSheet.create({
	userInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginBottom: 5
	},

	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},

	fullName: {
		fontSize: 16,
		fontWeight: "600",
		color: COLORS.black,
	},

	signature: {
		fontSize: 12,
		color: "#888",
	},

	cardContainer: {
		flexDirection: "column",
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		padding: 10,
		borderRadius: 15
	},

	postTitle: {
		fontSize: 20,
		fontWeight: "500",
		color: COLORS.black,
	},

	textInfo: {
		flexDirection: "column",
		marginBottom: 10,
	},


	postDescription: {
		fontSize: 16,
		color: COLORS.black,
	},

	link: {
		fontSize: 16,
		color: COLORS.black,
	},

	postTags: {
		fontSize: 16,
		color: COLORS.darkPlum,
		fontWeight: "500",
	},

	images: {
		flexDirection: "column"
	},

	imageGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginBottom: 16,
	},

	gridImage: {
		flex: 1,
		height: 200,
		borderRadius: 12,
	},

	largeImage: {
		flex: 1,
	},

	fullWidthImage: {
		flex: 1,
		height: 200,
		borderRadius: 12,
	},

	halfWidthImage: {
		flex: 1,
		height: 150,
		borderRadius: 12,
		marginHorizontal: 4,
	},

	thirdWidthImage: {
		flex: 1,
		height: 120,
		borderRadius: 12,
		marginHorizontal: 4,
	},

	statsContainer: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-around",
	},

	statItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 1
	},
	
	statLabel: {
		flexDirection: "row",
		alignItems: "center",
		fontSize: 14,
		fontWeight: "600",
		color: COLORS.black,
		marginHorizontal: 6,
	},

	menuModalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},

	menuModalContainer: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		width: "80%",
		padding: 0,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},

	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		paddingHorizontal: 20,
	},

	menuIcon: {
		marginRight: 15,
	},

	menuText: {
		fontSize: 16,
		color: COLORS.black,
	},

	menuDivider: {
		height: 1,
		backgroundColor: COLORS.lightGray,
	},

	editModalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},

	editModalContainer: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		width: "90%",
		padding: 20,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},

	editModalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},

	editModalTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: COLORS.black,
	},

	editFormContainer: {
		gap: 15,
	},

	inputLabel: {
		fontSize: 16,
		fontWeight: "500",
		color: COLORS.black,
		marginBottom: 5,
	},

	textInput: {
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		borderRadius: 8,
		padding: 10,
		fontSize: 16,
	},

	textArea: {
		height: 100,
		textAlignVertical: "top",
	},
});
