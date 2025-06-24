import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./header.styles";
import { LogoImage } from "../images";
import { LogoutIcon, PlusIcon, SettingsIcon } from "../icons";
import { router, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../../../modules/auth/context/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "../modal";
import { useState } from "react";
import { Input } from "../input";
import { useForm } from "react-hook-form";
import { CreatePostModal } from "../../../modules/userpost/ui/create-post-modal/modal";
import { CreateGroupChatModal } from "../../../modules/chats/entities/create-group-chat-modal";
import { CreateAlbumModal } from "../../../modules/albums/entities/ui/create-album-modal";
// import { CreateAlbumModal } from '../../../modules/settings/ui/create-album-modal';
// import { useAllPosts } from '../../../modules/userpost/hooks/useAllPosts';

export function Header() {
	const { user, setUser } = useUserContext();
	const [modalVisible, setModalVisible] = useState(false);

	const pathname = usePathname();
	const selectedPage =
		pathname?.split("/").filter(Boolean).pop() || "unknown";

	const handleLogout = () => {
		setUser(null);
		AsyncStorage.removeItem("token");
		router.push("/login");
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => router.replace("/main")}>
				<LogoImage style={styles.logo} />
			</TouchableOpacity>

			<View style={styles.othersNav}>
				{selectedPage !== "friends" && (
					<View style={styles.navDiv}>
						<TouchableOpacity
							style={styles.navIcon}
							onPress={() => {
								setModalVisible(true);
							}}
						>
							<PlusIcon style={styles.navIcon}></PlusIcon>
						</TouchableOpacity>
					</View>
				)}
				{selectedPage !== "chats" && (
					<View style={styles.navDiv}>
						<TouchableOpacity
							style={styles.navIcon}
							onPress={() => router.push("/settings")}
						>
							<SettingsIcon style={styles.navIcon} />
						</TouchableOpacity>
					</View>
				)}
				<View style={styles.navDiv}>
					<TouchableOpacity
						style={styles.navIcon}
						onPress={() => handleLogout()}
					>
						<LogoutIcon style={styles.navIcon}></LogoutIcon>
					</TouchableOpacity>
				</View>
			</View>

			{selectedPage === "main" ? (
				<CreatePostModal
					isVisible={modalVisible}
					onClose={() => setModalVisible(false)}
				/>
			) : (
				selectedPage === "myPosts" && (
					<CreatePostModal
						isVisible={modalVisible}
						onClose={() => setModalVisible(false)}
					/>
				)
			)}

			{selectedPage === "settings" ? (
				<CreateAlbumModal
					isVisible={modalVisible}
					onClose={() => setModalVisible(false)}
				/>
			) : (
				selectedPage === "albums" && (
					<CreateAlbumModal
						isVisible={modalVisible}
						onClose={() => setModalVisible(false)}
					/>
				)
			)}

			{selectedPage === "chats" && (
				<CreateGroupChatModal
					isVisible={modalVisible}
					onClose={() => setModalVisible(false)}
					onSwitch={() => setModalVisible(false)}
				/>
			)}
		</View>
	);
}
