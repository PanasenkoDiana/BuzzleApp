import { useEffect, useState } from "react";
import {
	FlatList,
	Text,
	TouchableOpacity,
	View,
	Image,
	Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

import { COLORS } from "../../../../shared/ui/colors";
import { GalleryIcon, PlusIcon, TrashIcon } from "../../../../shared/ui/icons";
import { DefaultAvatar } from "../../../../shared/ui/images";
import { Input } from "../../../../shared/ui/input";
import { useFriends } from "../../../friends/hooks/useFriends";
import { styles } from "./modal.styles";
import { ICreateGroupChatModalProps, IGroupForm } from "./modal.types";
import { SERVER_HOST } from "../../../../shared/constants";
import { AddUserToGroupModal } from "../add-user-to-group-modal";
import { ModalInCenter } from "../../../../shared/ui/modal/modal";

export function CreateGroupChatModal(props: ICreateGroupChatModalProps) {
	const { friends, getAllFriends } = useFriends();
	const [isVisibleAddUser, setIsVisibleAddUser] = useState(false);
	const [image, setImage] = useState<string[]>([]);
	const { control, handleSubmit } = useForm<IGroupForm>({
        // name: "",
        // image: "",
        // members: [],
    });

	useEffect(() => {
		getAllFriends();
	}, []);

// 	const pickImage = async () => {
// 		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

// 		if (permission.status !== "granted") {
// 			Alert.alert("Доступ до галереї", "Дозвольте доступ до галереї.");
// 			return;
// 		}
	
// 		const result = await ImagePicker.launchImageLibraryAsync({
// 			mediaTypes: ImagePicker.MediaTypeOptions.Images,
// 			allowsEditing: true,
// 			quality: 1,
// 			base64: true,
// 			allowsMultipleSelection: true,
// 		});
	
// 		if (!result.canceled) {

// 			const newUris = result.assets.map(asset => asset.uri);
// 			setImageUris(prevUris => [...prevUris, ...newUris]);

// 		}
	
// 		if (!result.canceled && result.assets.length > 0) {
// 			const newBase64Imgs = result.assets
// 				.map((asset) => asset.base64)
// 				.filter(Boolean) as string[];
		
// 			setBase64Images((prev: string[]) => [...prev, ...newBase64Imgs.map(b64 => `data:image/png;base64,${b64}`)]);
// }
	
// 	};

	if (isVisibleAddUser) {
		return (
			<AddUserToGroupModal
				isVisible={isVisibleAddUser}
				onClose={() => setIsVisibleAddUser(false)}
			/>
		);
	}

	return (
		<ModalInCenter visible={props.isVisible} onClose={props.onClose}>
			<View style={{ gap: 20 }}>
				<Text style={styles.title}>Нова група</Text>

				<Input label="Назва" />

				<View style={styles.GroupAvatar}>
					{image ? (
						<Image
							// source={{ uri: image }}
							style={{ width: 45, height: 45, borderRadius: 100 }}
						/>
					) : (
						<DefaultAvatar
							borderRadius={100}
							style={{ width: 45, height: 45 }}
						/>
					)}

					<View style={styles.AvatarButtons}>
						<TouchableOpacity style={styles.AvatarButton}>
							<PlusIcon width={20} height={20} stroke={COLORS.darkPlum} />
							<Text style={styles.AvatarText}>Додайте фото</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.AvatarButton} onPress={() => {}}>
							<GalleryIcon width={20} height={20} stroke={COLORS.darkPlum} />
							<Text style={styles.AvatarText}>Оберіть фото</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.MembersView}>
					<View style={styles.MembersHeader}>
						<Text style={styles.MembersTitle}>Учасники</Text>

						<TouchableOpacity
							style={styles.AvatarButton}
							onPress={() => setIsVisibleAddUser(true)}
						>
							<PlusIcon width={20} height={20} stroke={COLORS.darkPlum} />
							<Text style={styles.AvatarText}>Додайте учасника</Text>
						</TouchableOpacity>
					</View>

					<FlatList
						data={friends}
						style={{ height: 250 }}
						keyExtractor={(item) => item.id.toString()}
						contentContainerStyle={{ flexDirection: "column", gap: 10 }}
						scrollEnabled
						renderItem={({ item }) => {
							const avatar =
								item.Profile.avatars?.[item.Profile.avatars.length - 1]
									?.image?.filename;

							return (
								<View style={styles.contactCard}>
									{avatar ? (
										<Image
											source={{ uri: `${SERVER_HOST}media/${avatar}` }}
											style={{ width: 45, height: 45, borderRadius: 1000 }}
										/>
									) : (
										<DefaultAvatar
											borderRadius={1000}
											style={{ width: 45, height: 45 }}
										/>
									)}

									<Text style={styles.contactName}>
										{item.name} {item.surname}
									</Text>

									<TouchableOpacity style={styles.deleteButton}>
										<TrashIcon
											stroke={COLORS.darkPlum}
											width={20}
											height={20}
										/>
									</TouchableOpacity>
								</View>
							);
						}}
					/>
				</View>

				<View style={styles.buttonsBlock}>
					<TouchableOpacity style={styles.dismissButton}>
						<Text style={styles.dismissButtonText}>Назад</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.saveButton} onPress={handleSubmit(() => {})}>
						<Text style={styles.saveButtonText}>Зберегти зміни</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ModalInCenter>
	);
}
