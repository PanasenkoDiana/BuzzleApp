import { View, Text, TouchableOpacity } from "react-native";
import { ChatsLayout } from "../../entities/ui/ChatsLayout";
import { useEffect, useState } from "react";
import { ChatIcon, ContactsIcon } from "../../../../shared/ui/icons";
import { styles } from "./ChatsPage.styles";
import { ContactsPage } from "../ContactsPage";
import { NotificationsPage } from "../NotificationsPage";
import { COLORS } from "../../../../shared/ui/colors";
import { AllChatsPage } from "../AllChatsPage";

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
					<NotificationsPage />
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
