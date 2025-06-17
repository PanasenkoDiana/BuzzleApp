import { View, Text, FlatList } from "react-native";
import { styles } from "./NotificationsPage.styles";

export function NotificationsPage() {
	return (
		<View style={styles.container}>
			<FlatList
				data={[]}
				renderItem={({ item }) => (
					<View>
						<Text>{item}</Text>
					</View>
				)}
			/>
		</View>
	);
}
