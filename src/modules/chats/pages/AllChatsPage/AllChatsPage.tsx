import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "./AllChatsPage.styles";
import { useRouter } from "expo-router";

export function AllChatsPage() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			{/* <FlatList
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
						onPress={() =>
							router.push({
								pathname: "/сhat",
								params: {
									recipientId: item.id,
									recipientName: item.name,
								},
							})
						}
					>
						{item.avatar ? (
							<Image
								source={{ uri: item.avatar }}
								style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
							/>
						) : (
							<View
								style={{
									width: 40,
									height: 40,
									borderRadius: 20,
									backgroundColor: "#eee",
									marginRight: 10,
								}}
							/>
						)}
						<Text style={{ fontSize: 18 }}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/> */}
		</View>
	);
}
