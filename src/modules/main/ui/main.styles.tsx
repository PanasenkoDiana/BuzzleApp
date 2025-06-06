import { COLORS } from "../../../shared/ui/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	profileSection: {
		padding: 20,
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightGray,
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 16,
	},
	fullName: {
		fontSize: 24,
		fontWeight: "bold",
		color: COLORS.black,
		marginBottom: 4,
	},
	username: {
		fontSize: 16,
		color: COLORS.gray,
		marginBottom: 16,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginBottom: 20,
	},
	statItem: {
		alignItems: "center",
	},
	statNumber: {
		fontSize: 18,
		fontWeight: "bold",
		color: COLORS.black,
	},
	statLabel: {
		fontSize: 14,
		color: COLORS.gray,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 12,
		marginBottom: 16,
	},
	button: {
		paddingVertical: 8,
		paddingHorizontal: 24,
		borderRadius: 20,
		minWidth: 120,
		alignItems: "center",
	},
	confirmButton: {
		backgroundColor: COLORS.plum,
	},
	deleteButton: {
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.darkPlum,
	},
	buttonText: {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: "500",
	},
	deleteButtonText: {
		color: COLORS.darkPlum,
	},
	albumButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		padding: 12,
		backgroundColor: COLORS.lightGray,
		borderRadius: 12,
	},
	albumButtonText: {
		fontSize: 16,
		color: COLORS.black,
	},
	postsSection: {
		padding: 16,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: COLORS.black,
		marginBottom: 16,
	},
});
