import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
        gap: 10
	},
    list: {
        gap: 10,
        margin: 10
    },
	contact: {
		flexDirection: "row",
        width: "100%",
		height: 50,
		gap: 10,
	},
	contactImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	contactInfo: {
		justifyContent: "center",
	},
	contactName: {
		fontSize: 18,
		fontWeight: "bold",
	},
	contactUsername: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
