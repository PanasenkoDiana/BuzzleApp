import { View, Text, FlatList } from "react-native";
import { styles } from "./AllChatsPage.styles";

export function AllChatsPage() {
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
