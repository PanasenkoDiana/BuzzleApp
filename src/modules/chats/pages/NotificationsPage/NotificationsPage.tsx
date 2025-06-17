import { View, Text, FlatList, Image } from "react-native";
import { styles } from "./NotificationsPage.styles";
import { ChatMessage } from "../../types/types";

interface INotificationsPage {
	notifications: ChatMessage[];
}

export function NotificationsPage(props: INotificationsPage) {
	const sortedNotifications = [...props.notifications].sort((a, b) => {
		return new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime();
	});
	return (
		<View style={styles.container}>
			<FlatList
				data={sortedNotifications}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<View style={styles.notification}>
						<View>
							<Image
								source={{
									uri:
										item.author.profileImage ||
										"https://www.gravatar.com/avatar/",
								}}
								style={styles.contactImage}
							/>
						</View>
						<View style={styles.infoContainer}>
							<View style={styles.nameContainer}>
								<Text style={styles.contactName}>
									{item.author.name && item.author.surname
										? `${item.author.name} ${item.author.surname}`
										: item.author.surname
										? item.author.surname
										: item.author.username
										? `@${item.author.username}`
										: ""}
								</Text>
								<Text style={styles.time}>
									{new Date(item.sent_at).toLocaleTimeString(
										[],
										{
											hour: "2-digit",
											minute: "2-digit",
										}
									)}
								</Text>
							</View>
							<Text style={styles.notificationContent}>
								{item.content}
							</Text>
						</View>
					</View>
				)}
			/>
		</View>
	);
}
