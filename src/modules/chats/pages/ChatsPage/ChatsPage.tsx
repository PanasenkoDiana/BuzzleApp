import { View, Text, TouchableOpacity } from "react-native";
import { ChatsLayout } from "../../entities/ui/ChatsLayout";
import { useEffect, useState } from "react";
import { ChatIcon, ContactsIcon } from "../../../../shared/ui/icons";
import { styles } from "./ChatsPage.styles";
import { ContactsPage } from "../ContactsPage";
import { NotificationsPage } from "../NotificationsPage";
import { COLORS } from "../../../../shared/ui/colors";
import { AllChatsPage } from "../AllChatsPage";

import { ChatMessage } from "../../types/types";

const contacts = [
	{
		username: "johndoe123",
		name: "John",
		surname: "Doe",
		profileImage: "https://i.pravatar.cc/150?img=1",
	},
	{
		username: "annasmith",
		name: "Anna",
		surname: "Smith",
		profileImage: "https://i.pravatar.cc/150?img=2",
	},
	{
		username: "mike89",
		name: "Mike",
		surname: null,
		profileImage: null,
	},
	{
		username: "kate.williams",
		name: null,
		surname: "Williams",
		profileImage: "https://i.pravatar.cc/150?img=3",
	},
	{
		username: "user1234",
		name: null,
		surname: null,
		profileImage: null,
	},
	{
		username: "sarah.connor",
		name: "Sarah",
		surname: "Connor",
		profileImage: "https://i.pravatar.cc/150?img=4",
	},
	{
		username: "tonystark",
		name: "Tony",
		surname: "Stark",
		profileImage: "https://i.pravatar.cc/150?img=5",
	},
	{
		username: "bruce.w",
		name: "Bruce",
		surname: "Wayne",
		profileImage: "https://i.pravatar.cc/150?img=6",
	},
	{
		username: "diana_p",
		name: "Diana",
		surname: "Prince",
		profileImage: "https://i.pravatar.cc/150?img=7",
	},
	{
		username: "clark.kent",
		name: "Clark",
		surname: "Kent",
		profileImage: "https://i.pravatar.cc/150?img=8",
	},
	{
		username: "peter.parker",
		name: "Peter",
		surname: "Parker",
		profileImage: "https://i.pravatar.cc/150?img=9",
	},
	{
		username: "nat.romanoff",
		name: "Natasha",
		surname: "Romanoff",
		profileImage: "https://i.pravatar.cc/150?img=10",
	},
	{
		username: "stever",
		name: "Steve",
		surname: "Rogers",
		profileImage: "https://i.pravatar.cc/150?img=11",
	},
	{
		username: "loganx",
		name: "Logan",
		surname: null,
		profileImage: "https://i.pravatar.cc/150?img=12",
	},
	{
		username: "jeangrey",
		name: "Jean",
		surname: "Grey",
		profileImage: null,
	},
	{
		username: "scott_summers",
		name: "Scott",
		surname: "Summers",
		profileImage: "https://i.pravatar.cc/150?img=13",
	},
	{
		username: "ororo.munroe",
		name: "Ororo",
		surname: "Munroe",
		profileImage: "https://i.pravatar.cc/150?img=14",
	},
	{
		username: "remy_lebeau",
		name: "Remy",
		surname: "LeBeau",
		profileImage: "https://i.pravatar.cc/150?img=15",
	},
	{
		username: "kurtw",
		name: "Kurt",
		surname: "Wagner",
		profileImage: null,
	},
	{
		username: "charlesx",
		name: "Charles",
		surname: "Xavier",
		profileImage: "https://i.pravatar.cc/150?img=16",
	},
];

export const notifications: ChatMessage[] = [
	{
		id: 1,
		content: "Hey, how are you doing?",
		author: {
			username: "johndoe123",
			name: "John",
			surname: "Doe",
			profileImage: "https://i.pravatar.cc/150?img=1",
		},
		sent_at: new Date("2025-06-17T12:00:00Z"),
		attached_image: null,
	},
	{
		id: 2,
		content: "Don’t forget the meeting at 3 PM.",
		author: {
			username: "annasmith",
			name: "Anna",
			surname: "Smith",
			profileImage: "https://i.pravatar.cc/150?img=2",
		},
		sent_at: new Date("2025-06-17T11:55:00Z"),
		attached_image: null,
	},
	{
		id: 3,
		content: "Check out this cool photo!",
		author: {
			username: "mike89",
			name: "Mike",
			surname: null,
			profileImage: null,
		},
		sent_at: new Date("2025-06-17T11:50:00Z"),
		attached_image: null,
	},
	{
		id: 4,
		content: "Can you send me the report?",
		author: {
			username: "kate.williams",
			name: null,
			surname: "Williams",
			profileImage: "https://i.pravatar.cc/150?img=3",
		},
		sent_at: new Date("2025-06-17T11:45:00Z"),
		attached_image: null,
	},
	{
		id: 5,
		content: "What time are we meeting today?",
		author: {
			username: "user1234",
			name: null,
			surname: null,
			profileImage: null,
		},
		sent_at: new Date("2025-06-17T11:40:00Z"),
		attached_image: null,
	},
	{
		id: 6,
		content: "Let’s grab lunch tomorrow.",
		author: {
			username: "sarah.connor",
			name: "Sarah",
			surname: "Connor",
			profileImage: "https://i.pravatar.cc/150?img=4",
		},
		sent_at: new Date("2025-06-17T11:35:00Z"),
		attached_image: null,
	},
	{
		id: 7,
		content: "Mission accomplished.",
		author: {
			username: "tonystark",
			name: "Tony",
			surname: "Stark",
			profileImage: "https://i.pravatar.cc/150?img=5",
		},
		sent_at: new Date("2025-06-17T11:30:00Z"),
		attached_image: null,
	},
	{
		id: 8,
		content: "I’ll call you back in 5 mins.",
		author: {
			username: "bruce.w",
			name: "Bruce",
			surname: "Wayne",
			profileImage: "https://i.pravatar.cc/150?img=6",
		},
		sent_at: new Date("2025-06-17T11:25:00Z"),
		attached_image: null,
	},
	{
		id: 9,
		content: "Good luck with your presentation!",
		author: {
			username: "diana_p",
			name: "Diana",
			surname: "Prince",
			profileImage: "https://i.pravatar.cc/150?img=7",
		},
		sent_at: new Date("2025-06-17T11:20:00Z"),
		attached_image: null,
	},
	{
		id: 10,
		content: "See you at the gym.",
		author: {
			username: "clark.kent",
			name: "Clark",
			surname: "Kent",
			profileImage: "https://i.pravatar.cc/150?img=8",
		},
		sent_at: new Date("2025-06-17T11:15:00Z"),
		attached_image: null,
	},
	{
		id: 11,
		content: "New article just dropped!",
		author: {
			username: "peter.parker",
			name: "Peter",
			surname: "Parker",
			profileImage: "https://i.pravatar.cc/150?img=9",
		},
		sent_at: new Date("2025-06-17T11:10:00Z"),
		attached_image: null,
	},
	{
		id: 12,
		content: "We need a new strategy.",
		author: {
			username: "nat.romanoff",
			name: "Natasha",
			surname: "Romanoff",
			profileImage: "https://i.pravatar.cc/150?img=10",
		},
		sent_at: new Date("2025-06-17T11:05:00Z"),
		attached_image: null,
	},
	{
		id: 13,
		content: "I'm on my way.",
		author: {
			username: "stever",
			name: "Steve",
			surname: "Rogers",
			profileImage: "https://i.pravatar.cc/150?img=11",
		},
		sent_at: new Date("2025-06-17T11:00:00Z"),
		attached_image: null,
	},
	{
		id: 14,
		content: "Coffee later?",
		author: {
			username: "loganx",
			name: "Logan",
			surname: null,
			profileImage: "https://i.pravatar.cc/150?img=12",
		},
		sent_at: new Date("2025-06-17T10:55:00Z"),
		attached_image: null,
	},
	{
		id: 15,
		content: "Class starts at 9 AM sharp.",
		author: {
			username: "jeangrey",
			name: "Jean",
			surname: "Grey",
			profileImage: null,
		},
		sent_at: new Date("2025-06-17T10:50:00Z"),
		attached_image: null,
	},
	{
		id: 16,
		content: "Don’t be late!",
		author: {
			username: "scott_summers",
			name: "Scott",
			surname: "Summers",
			profileImage: "https://i.pravatar.cc/150?img=13",
		},
		sent_at: new Date("2025-06-17T10:45:00Z"),
		attached_image: null,
	},
	{
		id: 17,
		content: "It’s going to rain later.",
		author: {
			username: "ororo.munroe",
			name: "Ororo",
			surname: "Munroe",
			profileImage: "https://i.pravatar.cc/150?img=14",
		},
		sent_at: new Date("2025-06-17T10:40:00Z"),
		attached_image: null,
	},
	{
		id: 18,
		content: "Got the tickets!",
		author: {
			username: "remy_lebeau",
			name: "Remy",
			surname: "LeBeau",
			profileImage: "https://i.pravatar.cc/150?img=15",
		},
		sent_at: new Date("2025-06-17T10:35:00Z"),
		attached_image: null,
	},
	{
		id: 19,
		content: "Can you join the call?",
		author: {
			username: "kurtw",
			name: "Kurt",
			surname: "Wagner",
			profileImage: null,
		},
		sent_at: new Date("2025-06-17T10:30:00Z"),
		attached_image: null,
	},
	{
		id: 20,
		content: "Welcome to the team!",
		author: {
			username: "charlesx",
			name: "Charles",
			surname: "Xavier",
			profileImage: "https://i.pravatar.cc/150?img=16",
		},
		sent_at: new Date("2025-06-17T10:25:00Z"),
		attached_image: null,
	},
];

export function ChatsPage() {
	const [selectedPage, setSelectedPage] = useState<string>("contacts");

	useEffect(() => {
		console.log(selectedPage);
	}, [selectedPage]);

	return (
		<ChatsLayout
			selectedPage={selectedPage}
			setSelectedPage={(page) => setSelectedPage(page)}
		>
			{selectedPage === "contacts" && (
				<View style={styles.container}>
					<View style={styles.header}>
						<ContactsIcon
							width={27.5}
							height={27.5}
							fill={COLORS.lightGray}
						/>
						<Text style={styles.headerText}>Контакти</Text>
					</View>
					<ContactsPage contacts={contacts} />
				</View>
			)}
			{selectedPage === "notifications" && (
				<View style={styles.container}>
					<View style={styles.header}>
						<ChatIcon
							width={22.5}
							height={22.5}
							stroke={COLORS.lightGray}
						/>
						<Text style={styles.headerText}>Повідомлення</Text>
					</View>
					<NotificationsPage notifications={notifications} />
				</View>
			)}
			{selectedPage === "chats" && (
				<View style={styles.container}>
					<View style={styles.header}>
						<ChatIcon
							width={22.5}
							height={22.5}
							stroke={COLORS.lightGray}
						/>
						<Text style={styles.headerText}>Групові чати</Text>
					</View>
					<AllChatsPage />
				</View>
			)}
		</ChatsLayout>
	);
}
