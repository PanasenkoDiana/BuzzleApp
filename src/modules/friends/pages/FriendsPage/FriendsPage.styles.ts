import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const styles = StyleSheet.create({
	container: {
		margin: 10,
		gap: 5
	},
	mainContainer: {
		borderWidth: 1,
		borderColor: COLORS.black,
		borderRadius: 12,
		padding: 10,
		gap: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
	},
	seeAllText: {
        color: COLORS.gray
    },
    content: {
        maxHeight: 527
    },
	list: {
		gap: 10,
	},
    main: {
        gap: 10,
        flexDirection: 'column',
    }
});
