import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "./AllChatsPage.styles";
import { useRouter } from "expo-router";
import { useAllChats } from "../../hooks/useAllChats";
import { useEffect } from "react";
import { IGroupChat } from "../../entities/create-group-chat-modal/modal.types";
import { DefaultAvatar } from "../../../../shared/ui/images";
import { SERVER_HOST } from "../../../../shared/constants";

export function AllChatsPage() {
	const router = useRouter();
	const { chats, getAllChats } = useAllChats();

	useEffect(() => {
		getAllChats();
		console.log("Group chats" + chats);
	}, []);

	function formatMessageTime(isoString: string): string {
		const messageDate = new Date(isoString);
		const now = new Date();

		const isToday =
			messageDate.getDate() === now.getDate() &&
			messageDate.getMonth() === now.getMonth() &&
			messageDate.getFullYear() === now.getFullYear();

		return isToday
			? messageDate.toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
			  })
			: messageDate.toLocaleDateString("ru-RU");
	}

	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={{ flexDirection: "column", gap: 5 }}
				data={chats}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					const lastMessage = item.messages[item.messages.length - 1];
					const sender = item.members.find(
						(m) => m.id === lastMessage?.authorId
					);
					// alert(JSON.stringify(item.members))
					// alert(JSON.stringify(item))

					return (
						<TouchableOpacity onPress={() => {}}>
							<View style={styles.card}>
								<View>
									{item.avatar ? (
										<Image
											style={styles.avatar}
											source={{
												uri: `${SERVER_HOST}media/${item.avatar}`,
											}}
										/>
									) : (
										<DefaultAvatar style={styles.avatar} />
									)}
								</View>

								{lastMessage && (
									<View style={styles.lastMessageBlock}>
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											{sender?.name ? (
												<Text
													style={
														styles.lastMessageName
													}
												>
													{sender.name}{" "}
													{sender.surname}
												</Text>
											) : sender?.surname ? (
												<Text
													style={
														styles.lastMessageName
													}
												>
													{sender.surname}
												</Text>
											) : (
												<Text
													style={
														styles.lastMessageName
													}
												>
													{sender?.username}
												</Text>
											)}
											<Text style={styles.time}>
												{lastMessage
													? formatMessageTime(
															lastMessage.sentAt ||
																""
													  )
													: ""}
											</Text>
										</View>
										<Text style={styles.lastMessageText}>
											{lastMessage.content}
										</Text>
									</View>
								)}
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}
