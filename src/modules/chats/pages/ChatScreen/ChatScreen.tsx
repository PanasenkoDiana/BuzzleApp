import { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { styles } from "./ChatScreen.styles";
import { io, Socket } from "socket.io-client";
import { useLocalSearchParams } from "expo-router";
import { SERVER_HOST } from "../../../../shared/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowIcon, CheckIcon, GalleryIcon, SendIcon } from "../../../../shared/ui/icons";
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

export function ChatScreen() {
    const { recipientId, recipientName, recipientUsername } = useLocalSearchParams<{ recipientId: string; recipientName: string; recipientUsername: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatGroupId, setChatGroupId] = useState<number | null>(null);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const [thisRecipient, setThisRecipient] = useState<IUser | null>(null);

    const { recipient, getRecipient } = useRecipient();

    // Загружаем получателя по ID и сразу сохраняем в состояние
    useEffect(() => {
        async function fetchRecipient() {
            if (!recipientId) return;

            const result = await getRecipient(+recipientId);
            console.log("Получили результат:", result);
            if (result && result.data) {
                setThisRecipient(result.data);
            }
        }
        fetchRecipient();
    }, [recipientId]);

    // Можно отследить обновление состояния thisRecipient
    useEffect(() => {
        if (thisRecipient) {
            console.log("Обновился thisRecipient:", thisRecipient);
        }
    }, [thisRecipient]);

    useEffect(() => {
        const loadUserId = async () => {
            const token = await AsyncStorage.getItem("token");
            if (!token) return;
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
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
                const response = await fetch(`${SERVER_HOST}api/chats/get-or-create-group`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify({ recipientUsername }),
                });

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
                const response = await fetch(`${SERVER_HOST}api/chats/messages/${chatGroupId}`, {
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });

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
                        .sort((a: Message, b: Message) => new Date(a.sentAt!).getTime() - new Date(b.sentAt!).getTime());

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

    const sendMessage = async () => {
        if (!newMessage.trim() || !chatGroupId || currentUserId === null) return;

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
        socketRef.current?.emit("group_message", formattedMessage);
    };

    function formatTime(isoString?: string): string {
        if (!isoString) return "";
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <View style={styles.headerHelp}>
                    <TouchableOpacity style={styles.backButton}>
                        <ArrowIcon width={20} height={20} stroke={COLORS.lightGray} />
                    </TouchableOpacity>
                    <View style={styles.recipientHeader}>
                        {thisRecipient?.Profile?.avatars?.length ? (
                            <Image
                                source={{ uri: `${SERVER_HOST}media/${thisRecipient.Profile.avatars[thisRecipient.Profile.avatars.length - 1].image.filename}` }}
                                style={styles.recipientAvatar}
                            />
                        ) : (
                            <DefaultAvatar style={styles.recipientAvatar} />
                        )}
                        <Text style={styles.header}>{thisRecipient?.name ?? "Загрузка..."}</Text>
                    </View>
                </View>

                <Ionicons name="ellipsis-vertical" size={22} color={COLORS.black} />
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
                renderItem={({ item }) => (
                    <View style={item.senderId === currentUserId ? styles.myMessage : styles.theirMessage}>
                        {item.senderId !== currentUserId && thisRecipient?.Profile?.avatars?.length ? (
                            <Image
                                source={{ uri: `${SERVER_HOST}media/${thisRecipient.Profile.avatars[thisRecipient.Profile.avatars.length - 1].image.filename}` }}
                                style={styles.messageAvatar}
                            />
                        ) : (
                            item.senderId !== currentUserId && <DefaultAvatar style={styles.messageAvatar} />
                        )}
                        <View style={item.senderId === currentUserId ? styles.myMessageText : styles.theirMessageText}>
                            <Text style={styles.messageText}>{item.content}</Text>
                            <Text style={styles.messageData}>
                                {formatTime(item.sentAt)}
                                <CheckIcon width={20} height={20} />
                            </Text>
                        </View>
                    </View>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Повідомлення"
                />
                <TouchableOpacity style={styles.optionDiv}>
                    <GalleryIcon />
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={sendMessage}>
                    <SendIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
}
