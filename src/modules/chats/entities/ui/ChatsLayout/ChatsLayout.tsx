import { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./ChatsLayout.styles";
import { ChatIcon, ContactsIcon } from "../../../../../shared/ui/icons";

interface IChatsLayout {
	selectedPage: string;
	setSelectedPage: (page: string) => void;
	children: ReactNode;
}

export function ChatsLayout(props: IChatsLayout) {
	const { selectedPage, setSelectedPage, children } = props;
	return (
		<View style={{flex: 1}}>
			<View style={styles.navContainer}>
				<TouchableOpacity
					onPress={() => setSelectedPage("contacts")}
					style={[
						styles.navButtom,
					]}
				>
					{selectedPage === "contacts" && <View style={styles.selectedBlock} />}
					<ContactsIcon style={{ width: 25, height: 25 }} />
					<Text style={styles.text}>Контакти</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => setSelectedPage("notifications")}
					style={[
						styles.navButtom,
					]}
				>
					{selectedPage === "notifications" && <View style={styles.selectedBlock} />}
					<ChatIcon style={{ width: 20, height: 20 }} />
					<Text style={styles.text}>Повідомлення</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => setSelectedPage("chats")}
					style={[
						styles.navButtom,
					]}
				>
					{selectedPage === "chats" && <View style={styles.selectedBlock} />}
					<ChatIcon style={{ width: 20, height: 20 }} />
					<Text style={styles.text}>Групові чати</Text>
				</TouchableOpacity>
			</View>
			{children}
		</View>
	);
}
