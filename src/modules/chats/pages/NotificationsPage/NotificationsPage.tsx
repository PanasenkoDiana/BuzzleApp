import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { styles } from "./NotificationsPage.styles";
import { ChatMessage } from "../../types/types";
import { useRouter } from "expo-router";
import { useAllChats } from "../../hooks/useAllChats";
import { SERVER_HOST } from "../../../../shared/constants";

interface INotificationsPage {
	notifications: ChatMessage[];
}

function formatMessageTime(isoString: string): string {
	const messageDate = new Date(isoString);
	const now = new Date();

	const isToday =
		messageDate.getDate() === now.getDate() &&
		messageDate.getMonth() === now.getMonth() &&
		messageDate.getFullYear() === now.getFullYear();

	return isToday
		? messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		: messageDate.toLocaleDateString("ru-RU"); // формат: 21.05.2025
}

export function NotificationsPage(props: INotificationsPage) {
	const router = useRouter();
	const { chats } = useAllChats();

	const sortedNotifications = [...props.notifications].sort((a, b) => {
		return new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime();
	});

	return (
		<View style={styles.container}>
			<FlatList
				data={chats}
				contentContainerStyle={styles.list}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					const lastMessage = item.messages[item.messages.length - 1];

					return (
						<TouchableOpacity
							onPress={() =>
								router.push({
									pathname: "/chat",
									params: {
										recipientId: item.members[1].id,
										recipientUsername: item.members[1].username,
										recipientName:
											`${item.members[1].name || ""} ${item.members[1].surname || ""}`.trim() ||
											`@${item.members[1].username}`,
									},
								})
							}
						>
							<View style={styles.notification}>
								<View>
									<Image
										source={{
											uri: `${SERVER_HOST}media/${
												item.members[1].Profile.avatars.at(-1)?.image.filename
											}`,
										}}
										style={styles.contactImage}
									/>
								</View>
								<View style={styles.infoContainer}>
									<View style={styles.nameContainer}>
										<View>
											<Text style={styles.contactName}>
												{item.members[1].name && item.members[1].surname
													? `${item.members[1].name} ${item.members[1].surname}`
													: item.members[1].surname
													? item.members[1].surname
													: item.members[1].username
													? `@${item.members[1].username}`
													: ""}
											</Text>
											<Text>{lastMessage?.content}</Text>
										</View>

										<Text style={styles.time}>
											{lastMessage ? formatMessageTime(lastMessage.sent_at) : ""}
										</Text>
									</View>
									<Text style={styles.notificationContent}>{item.content}</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}
