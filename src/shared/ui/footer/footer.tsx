import { View, Text, TouchableOpacity } from "react-native";
import { HomeIcon, GalleryIcon, PeopleIcon, ChatIcon } from "../icons";
import { styles } from "./footer.styles";
import { router } from "expo-router";

interface IFooterProps {
	selectedPage: string;
}

export function Footer({ selectedPage }: IFooterProps) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => router.push("/main")}
				style={[
					styles.navBlock,
				]}
			>
				{selectedPage === "main" && <View style={styles.selectedBlock} />}
				<HomeIcon style={styles.navIcon} />
				<Text style={styles.navText}>Головна</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => router.push("/myPosts")}
				style={[
					styles.navBlock,
				]}
			>
				{selectedPage === "myPosts" && <View style={styles.selectedBlock} />}
				<GalleryIcon style={styles.navIcon} />
				<Text style={styles.navText}>Мої публікації</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => router.push("/friends")}
				style={[
					styles.navBlock,
				]}
			>
				{selectedPage === "friends" && <View style={styles.selectedBlock} />}
				<PeopleIcon style={styles.navIcon} />
				<Text style={styles.navText}>Друзі</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => router.push("/chats")}
				style={[
					styles.navBlock,
				]}
			>
				{selectedPage === "chats" && <View style={styles.selectedBlock} />}
				<ChatIcon style={styles.navIcon} />
				<Text style={styles.navText}>Чати</Text>
			</TouchableOpacity>
		</View>
	);
}
