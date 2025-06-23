import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	Image,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect, useRef, Fragment } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { useRouter } from "expo-router";
import { styles } from "./ChatScreen.styles";
import { SERVER_HOST } from "../../../../shared/constants";
import {
	ArrowIcon,
	CheckIcon,
	GalleryIcon,
	SendIcon,
} from "../../../../shared/ui/icons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../shared/ui/colors";
import { DefaultAvatar } from "../../../../shared/ui/images";
import { useRecipient } from "../../hooks/useRecipient";
import { IUser } from "../../../auth/types";

const SOCKET_URL = SERVER_HOST;

type Message = {
	id?: number;
	content: string;
	senderId: number;
	chatGroupId?: number;
	sentAt?: string;
};

type GroupedMessage = {
	date: string;
	data: Message[];
};

export function ChatScreen() {
	const { recipientId, recipientName, recipientUsername } =
		useLocalSearchParams<{
			recipientId: string;
			recipientName: string;
			recipientUsername: string;
		}>();
	const router = useRouter();
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [chatGroupId, setChatGroupId] = useState<number | null>(null);
	const [currentUserId, setCurrentUserId] = useState<number | null>(null);
	const socketRef = useRef<Socket | null>(null);
	const flatListRef = useRef<FlatList>(null);
	const [thisRecipient, setThisRecipient] = useState<IUser | null>(null);
	const { getRecipient } = useRecipient();

	useEffect(() => {
		async function fetchRecipient() {
			if (!recipientId) return;
			const result = await getRecipient(+recipientId);
			if (result?.data) setThisRecipient(result.data);
		}
		fetchRecipient();
	}, [recipientId]);

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
	}, []);

	useEffect(() => {
		async function initChatGroup() {
			try {
				const token = await AsyncStorage.getItem("token");
				const response = await fetch(
					`${SERVER_HOST}api/chats/get-or-create-group`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							...(token
								? { Authorization: `Bearer ${token}` }
								: {}),
						},
						body: JSON.stringify({ recipientUsername }),
					}
				);

				const data = await response.json();
				if (response.ok) {
					setChatGroupId(data.chatGroupId);
				} else {
					alert("Ошибка инициализации чата: " + data.error);
				}
			} catch (e) {
				console.error("Ошибка при получении chatGroupId", e);
			}
		}
		if (recipientUsername) initChatGroup();
	}, [recipientUsername]);

	useEffect(() => {
		if (!chatGroupId) return;

		async function fetchHistory() {
			try {
				const token = await AsyncStorage.getItem("token");
				const response = await fetch(
					`${SERVER_HOST}api/chats/messages/${chatGroupId}`,
					{
						headers: {
							...(token
								? { Authorization: `Bearer ${token}` }
								: {}),
						},
					}
				);

				if (response.ok) {
					const data = await response.json();
					const sorted = data
						.map((msg: any) => ({
							id: msg.id,
							content: msg.content,
							senderId: msg.authorId,
							chatGroupId: msg.chatGroupId,
							sentAt: msg.sent_at,
						}))
						.sort(
							(a: Message, b: Message) =>
								new Date(a.sentAt!).getTime() -
								new Date(b.sentAt!).getTime()
						);

					setMessages(sorted);
				}
			} catch (e) {
				console.error("Ошибка получения истории чата", e);
			}
		}

		fetchHistory();
	}, [chatGroupId]);

	useEffect(() => {
		if (!chatGroupId) return;

		socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
		socketRef.current.emit("join_group", chatGroupId);

		socketRef.current.on("group_message", (msg: Message) => {
			if (msg.chatGroupId === chatGroupId) {
				setMessages((prev) => [...prev, msg]);
			}
		});

		return () => {
			socketRef.current?.disconnect();
		};
	}, [chatGroupId]);

	useEffect(() => {
		if (messages.length > 0) {
			setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: true });
			}, 100);
		}
	}, [messages]);

	const sendMessage = async () => {
		if (!newMessage.trim() || !chatGroupId || currentUserId === null)
			return;

		const token = await AsyncStorage.getItem("token");

		const response = await fetch(`${SERVER_HOST}api/chats/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify({
				content: newMessage,
				chatGroupId,
			}),
		});

		if (!response.ok) {
			const err = await response.text();
			alert("Ошибка отправки: " + err);
			return;
		}

		const msgObj = await response.json();
		const formattedMessage: Message = {
			id: msgObj.id,
			content: msgObj.content,
			senderId: currentUserId,
			chatGroupId,
			sentAt: msgObj.sent_at,
		};

		setMessages((prev) => [...prev, formattedMessage]);
		setNewMessage("");

		// Отправляем на сокет минимальный объект с нужными полями
		socketRef.current?.emit("group_message", {
			groupId: chatGroupId,
			content: formattedMessage.content,
			senderId: formattedMessage.senderId,
		});
	};

	function formatTime(isoString?: string): string {
		if (!isoString) return "";
		const date = new Date(isoString);
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	function formatDate(isoString?: string): string {
		if (!isoString) return "";
		const date = new Date(isoString);
		return date.toLocaleDateString("ru-RU", {
			day: "numeric",
			month: "long",
		});
	}

	function groupMessagesByDate(messages: Message[]): GroupedMessage[] {
		const groups: { [key: string]: Message[] } = {};

		messages.forEach((msg) => {
			const date = formatDate(msg.sentAt);
			if (!groups[date]) groups[date] = [];
			groups[date].push(msg);
		});

		return Object.entries(groups).map(([date, data]) => ({ date, data }));
	}

	const grouped = groupMessagesByDate(messages);

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.headerView}>
					<View style={styles.headerHelp}>
						<TouchableOpacity style={styles.backButton} onPress={()=> router.back()}>
							<ArrowIcon
								width={20}
								height={20}
								stroke={COLORS.lightGray}
							/>
						</TouchableOpacity>
						<View style={styles.recipientHeader}>
							{thisRecipient?.Profile?.avatars?.length ? (
								<Image
									source={{
										uri: `${SERVER_HOST}media/${
											thisRecipient.Profile.avatars.at(-1)
												?.image.filename
										}`,
									}}
									style={styles.recipientAvatar}
								/>
							) : (
								<DefaultAvatar style={styles.recipientAvatar} />
							)}
							<Text style={styles.header}>
								{thisRecipient?.name ?? "Загрузка..."}
							</Text>
						</View>
					</View>
					<Ionicons
						name="ellipsis-vertical"
						size={22}
						color={COLORS.black}
					/>
				</View>

				<FlatList<GroupedMessage>
					ref={flatListRef}
					data={grouped}
					keyExtractor={(_, index) => `date-${index}`}
					contentContainerStyle={{ paddingBottom: 16 }}
					renderItem={({ item }) => (
						<Fragment key={item.date}>
							<View style={styles.dateSeparatorContainer}>
								<Text style={styles.dateSeparatorText}>
									{item.date}
								</Text>
							</View>
							{item.data.map((msg) => (
								<View
									key={
										msg.id?.toString() ??
										Math.random().toString()
									}
									style={
										msg.senderId === currentUserId
											? styles.myMessage
											: styles.theirMessage
									}
								>
									{msg.senderId !== currentUserId &&
									thisRecipient?.Profile?.avatars?.length ? (
										<Image
											source={{
												uri: `${SERVER_HOST}media/${
													thisRecipient.Profile.avatars.at(
														-1
													)?.image.filename
												}`,
											}}
											style={styles.messageAvatar}
										/>
									) : (
										msg.senderId !== currentUserId && (
											<DefaultAvatar
												style={styles.messageAvatar}
											/>
										)
									)}
									<View
										style={
											msg.senderId === currentUserId
												? styles.myMessageText
												: styles.theirMessageText
										}
									>
										<Text style={styles.messageText}>
											{msg.content}
										</Text>
										<Text style={styles.messageData}>
											{formatTime(msg.sentAt)}
											<CheckIcon width={10} height={10} />
										</Text>
									</View>
								</View>
							))}
						</Fragment>
					)}
				/>

				<KeyboardAvoidingView
					behavior="padding"
					keyboardVerticalOffset={50}
				>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							value={newMessage}
							onChangeText={setNewMessage}
							placeholder="Повідомлення"
							multiline
						/>
						<TouchableOpacity style={styles.optionDiv}>
							<GalleryIcon />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.submitButton}
							onPress={sendMessage}
						>
							<SendIcon />
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</View>
		</View>
	);
}
