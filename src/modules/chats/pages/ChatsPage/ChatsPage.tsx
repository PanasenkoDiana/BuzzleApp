import { View, Text, TouchableOpacity } from "react-native";
import { ChatsLayout } from "../../entities/ui/ChatsLayout";
import { useEffect, useState } from "react";
import { ChatIcon, ContactsIcon } from "../../../../shared/ui/icons";
import { styles } from "./ChatsPage.styles";
import { ContactsPage } from "../ContactsPage";
import { NotificationsPage } from "../NotificationsPage";
import { COLORS } from "../../../../shared/ui/colors";
import { AllChatsPage } from "../AllChatsPage";
import { useFriends } from "../../../friends/hooks/useFriends";

export function ChatsPage() {
	const [selectedPage, setSelectedPage] = useState<string>("contacts");

	const { friends, getAllFriends } = useFriends()

	useEffect(() => {
		getAllFriends()
		console.log(selectedPage);
	}, [selectedPage]);

	return (
		<ChatsLayout
			selectedPage={selectedPage}
			setSelectedPage={(page: string) => setSelectedPage(page)}
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
					<ContactsPage contacts={friends} />
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
					<NotificationsPage notifications={[]} />
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
