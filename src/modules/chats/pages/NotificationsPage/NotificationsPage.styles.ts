import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		gap: 10,
		margin: 10,
		paddingBottom: 10,
	},
	notification: {
		flexDirection: "row",
		width: "100%",
		height: 50,
		gap: 10,
	},
	contactImagePlaceholder: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: COLORS.lightGray,
		alignItems: "center",
		justifyContent: "center",
	},

	contactImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	infoContainer: {
		justifyContent: "center",
		flex: 1,
	},
	nameContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	contactName: {
		fontSize: 18,
		fontWeight: "bold",
	},
	time: {
		fontSize: 12,
		color: COLORS.gray,
	},
	notificationContent: {
		fontWeight: 500,
	},
});
