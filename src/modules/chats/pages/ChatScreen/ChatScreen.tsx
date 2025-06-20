import { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./ChatScreen.styles";
import { io, Socket } from "socket.io-client";
import { useLocalSearchParams } from "expo-router";
import { SERVER_HOST } from "../../../../shared/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SOCKET_URL = SERVER_HOST;

type Message = {
    id?: number; // если есть id в базе
    content: string;
    senderId: number;
    chatGroupId?: number;
    sentAt?: string; // дата для сортировки
};

export function ChatScreen() {
    const { recipientId, recipientName } = useLocalSearchParams<{ recipientId: string; recipientName: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatGroupId, setChatGroupId] = useState<number | null>(null);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const socketRef = useRef<Socket | null>(null);

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
                    body: JSON.stringify({ recipientUsername: recipientId }),
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
        initChatGroup();
    }, [recipientId]);

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
                    // Сортируем по времени отправки, от старых к новым
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

    // Подключаемся к сокету, входим в комнату по chatGroupId и слушаем сообщения
    useEffect(() => {
        if (!chatGroupId) return;

        socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });

        // Заходим в комнату
        socketRef.current.emit("join_group", chatGroupId);

        // Слушаем новые сообщения из группы
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

        // Отправка на сервер HTTP (сохранение)
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

        // Добавляем сообщение локально (сразу в UI)
        setMessages((prev) => [...prev, formattedMessage]);
        setNewMessage("");

        // Отправляем в сокет, чтобы другие пользователи получили
        socketRef.current?.emit("group_message", formattedMessage);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chat with {recipientName}</Text>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
                renderItem={({ item }) => (
                    <Text style={item.senderId === currentUserId ? styles.myMessage : styles.theirMessage}>
                        {item.content}
                    </Text>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
