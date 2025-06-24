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
		: messageDate.toLocaleDateString("ru-RU");
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
					const member = item.members?.[1];

					// Пропустить, если нет второго участника (например, данные ещё не загружены или пусты)
					if (!member) return null;

					const profileImage = member.Profile?.avatars?.at(-1)?.image?.filename;

					return (
						<TouchableOpacity
							onPress={() =>
								router.push({
									pathname: "/chat",
									params: {
										recipientId: member.id,
										recipientUsername: member.username,
										recipientName:
											`${member.name || ""} ${member.surname || ""}`.trim() ||
											`@${member.username}`,
									},
								})
							}
						>
							<View style={styles.notification}>
								<View>
									{profileImage ? (
										<Image
											source={{ uri: `${SERVER_HOST}media/${profileImage}` }}
											style={styles.contactImage}
										/>
									) : (
										<View style={styles.contactImagePlaceholder} />
									)}
								</View>
								<View style={styles.infoContainer}>
									<View style={styles.nameContainer}>
										<View>
											<Text style={styles.contactName}>
												{member.name && member.surname
													? `${member.name} ${member.surname}`
													: member.surname
													? member.surname
													: member.username
													? `@${member.username}`
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
