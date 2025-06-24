import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { styles } from "./NotificationsPage.styles";
import { ChatMessage } from "../../types/types";
import { useRouter } from "expo-router";
import { useAllChats } from "../../hooks/useAllChats";
import { SERVER_HOST } from "../../../../shared/constants";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../../auth/types";
import { useFriends } from "../../../friends/hooks/useFriends";

interface INotificationsPage {
	notifications: ChatMessage[];
}

interface IChat {
	id: number;
	members?: IUser[];
	messages: { sent_at: string; content: string }[];
	content?: string;
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

	const { friends, getAllFriends } = useFriends();

	const [currentUserId, setCurrentUserId] = useState<number | null>(null);

	useEffect(() => {
		const loadUserId = async () => {
			const token = await AsyncStorage.getItem("token");
			if (!token) return;
			try {
				const payload = JSON.parse(atob(token.split(".")[1]));
				setCurrentUserId(payload.id);
			} catch (err) {
				console.warn("Ошибка при чтении токена:", err);
			}
		};
		loadUserId();
		getAllFriends();
	}, []);
	const safeChats: IChat[] = chats ?? [];
	const filteredChats = safeChats.filter((chat: IChat) => {
		if (!currentUserId) return false;
		const member = chat.members?.find((m: IUser) => m.id !== currentUserId);
		if (!member) return false;
		return friends.some((friend) => friend.id === member.id);
	});

	const sortedChats = [...filteredChats].sort((a, b) => {
		const lastAMsg = a.messages[a.messages.length - 1];
		const lastBMsg = b.messages[b.messages.length - 1];
		return new Date(lastBMsg.sent_at).getTime() - new Date(lastAMsg.sent_at).getTime();
	});

	return (
		<View style={styles.container}>
			<FlatList
				data={sortedChats}
				contentContainerStyle={styles.list}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					const lastMessage = item.messages[item.messages.length - 1];
					const member = item.members?.find((m: IUser) => m.id !== currentUserId);
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
