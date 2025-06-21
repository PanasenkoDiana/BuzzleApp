import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { styles } from "./NotificationsPage.styles";
import { ChatMessage } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useAllChats } from "../../hooks/useAllChats";
import { SERVER_HOST } from "../../../../shared/constants";

interface INotificationsPage {
	notifications: ChatMessage[];
}

export function NotificationsPage(props: INotificationsPage) {
	const router = useRouter();

	const { chats } = useAllChats()

	const sortedNotifications = [...props.notifications].sort((a, b) => {
		return new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime();
	});
	return (
		<View style={styles.container}>
			<FlatList
				data={chats}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							router.push( {
								pathname:"/chat",
								params:{
								recipientId: item.members[1].id,
								recipientUsername: item.members[1].username,
								recipientName: `${
									item.members[1].name || ""
								} ${item.members[1].surname || ""}`.trim() || `@${item.members[1].username}`,},
							})
						}
						// onPress={() =>
						// 	navigation.navigate("ChatScreen", {
						// 		recipientId: item.author.username,
						// 		recipientName: `${item.author.name} ${item.author.surname}`,
						// 	})
						// }
					>
						<View style={styles.notification}>
							<View>
								<Image
									source={{
										uri:
											`${SERVER_HOST}media/${item.members[1].Profile.avatars[item.members[0].Profile.avatars.length - 1].image.filename}`
											// item.author.profileImage ||
											// "https://www.gravatar.com/avatar/",
									}}
									style={styles.contactImage}
								/>
							</View>
							<View style={styles.infoContainer}>
								<View style={styles.nameContainer}>
									<View>

										<Text style={styles.contactName}>
											{item.members[1].name
											&& item.members[1].surname
												? `${item.members[1].name} ${item.members[1].surname}`
												: item.members[1].surname
												? item.members[1].surname
												: item.members[1].username
												? `@${item.members[1].username}`
												: ""
												}
										</Text>
										<Text>
											{item.messages[item.messages.length - 1].content}
										</Text>
									</View>

									<Text style={styles.time}>
										{new Date(item.sent_at).toLocaleTimeString(
											[],
											{
												hour: "2-digit",
												minute: "2-digit",
											}
										)}
									</Text>
								</View>
								<Text style={styles.notificationContent}>
									{item.content}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
