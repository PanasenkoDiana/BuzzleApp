import { useEffect, useState } from "react"
import {
	FlatList,
	Text,
	TouchableOpacity,
	View,
	Image,
	Alert,
} from "react-native"
import { Controller, useForm } from "react-hook-form"
import * as ImagePicker from "expo-image-picker"

import { COLORS } from "../../../../shared/ui/colors"
import { GalleryIcon, PlusIcon, TrashIcon } from "../../../../shared/ui/icons"
import { DefaultAvatar } from "../../../../shared/ui/images"
import { Input } from "../../../../shared/ui/input"
import { useFriends } from "../../../friends/hooks/useFriends"
import { styles } from "./modal.styles"
import { ICreateGroupChatModalProps, IGroupForm } from "./modal.types"
import { SERVER_HOST } from "../../../../shared/constants"
import { AddUserToGroupModal } from "../add-user-to-group-modal"
import { ModalInCenter } from "../../../../shared/ui/modal/modal"
import { useCreateGroup } from "../../hooks/useCreateGroup"

export function CreateGroupChatModal(props: ICreateGroupChatModalProps) {
	const { friends, getAllFriends } = useFriends()
	const [isVisibleAddUser, setIsVisibleAddUser] = useState(false)
	const [image, setImage] = useState<string | null>(null)
	const [selectedContacts, setSelectedContacts] = useState<number[]>([])
	const { control, handleSubmit } = useForm<IGroupForm>()
	const { createGroup } = useCreateGroup()

	useEffect(() => {
		getAllFriends()
	}, [])

	async function onSearch() {
		const result = await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (result.status === "granted") {
			const images = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				allowsMultipleSelection: false,
				selectionLimit: 1,
				base64: true,
			})

			if (!images.canceled && images.assets && images.assets.length > 0) {
				const base64img = images.assets[0].base64 ?? null
				setImage('data:image/png;base64,' +base64img)
			}
		}
	}

	if (isVisibleAddUser) {
		return (
			<AddUserToGroupModal
				isVisible={isVisibleAddUser}
				onClose={() => setIsVisibleAddUser(false)}
				onSave={(selectedIds) => {
					setSelectedContacts(selectedIds)
				}}
			/>
		)
	}

	async function onSubmit(data: IGroupForm) {
		data.members = selectedContacts
		data.avatar = image
		console.log("group data:", JSON.stringify(data))

		const response = await createGroup(data)
	}

	return (
		<ModalInCenter visible={props.isVisible} onClose={props.onClose}>
			<View style={{ gap: 10 }}>
				<Text style={styles.title}>Нова група</Text>

				<Controller
					name="name"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							label="Назва"
							value={field.value}
							onChangeText={field.onChange}
							error={fieldState.error?.message}
						/>
					)}
				/>

				<View style={styles.GroupAvatar}>
					<TouchableOpacity onPress={onSearch}>
						{image ? (
							<Image
								style={{ width: 45, height: 45, borderRadius: 100 }}
							/>
						) : (
							<DefaultAvatar
								style={{ width: 45, height: 45, borderRadius: 100 }}
							/>
						)}
					</TouchableOpacity>

					<View style={styles.AvatarButtons}>
						<TouchableOpacity style={styles.AvatarButton} onPress={onSearch}>
							<PlusIcon width={15} height={15} stroke={COLORS.darkPlum} />
							<Text style={styles.AvatarText}>Додайте фото</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.AvatarButton}>
							<GalleryIcon width={15} height={15} stroke={COLORS.darkPlum} />
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
							<PlusIcon width={15} height={15} stroke={COLORS.darkPlum} />
							<Text style={styles.AvatarText}>Додайте учасника</Text>
						</TouchableOpacity>
					</View>

					<FlatList
						data={friends.filter((f) => selectedContacts.includes(f.id))}
						style={{ height: 250 }}
						keyExtractor={(item) => item.id.toString()}
						contentContainerStyle={{ gap: 10 }}
						scrollEnabled
						renderItem={({ item }) => {
							const avatar =
								item.Profile.avatars?.[item.Profile.avatars.length - 1]
									?.image?.filename

							const handleRemove = () => {
								setSelectedContacts((prev) =>
									prev.filter((id) => id !== item.id)
								)
							}

							return (
								<View style={styles.contactCard}>
									{avatar ? (
										<Image
											source={{ uri: `${SERVER_HOST}media/${avatar}` }}
											style={{
												width: 45,
												height: 45,
												borderRadius: 1000,
											}}
										/>
									) : (
										<DefaultAvatar
											style={{
												width: 45,
												height: 45,
												borderRadius: 100,
											}}
										/>
									)}

									<Text style={styles.contactName}>
										{item.name} {item.surname}
									</Text>

									<TouchableOpacity
										style={styles.deleteButton}
										onPress={handleRemove}
									>
										<TrashIcon
											stroke={COLORS.darkPlum}
											width={15}
											height={15}
										/>
									</TouchableOpacity>
								</View>
							)
						}}
					/>
				</View>

				<View style={styles.buttonsBlock}>
					<TouchableOpacity style={styles.dismissButton}>
						<Text style={styles.dismissButtonText}>Назад</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.saveButton}
						onPress={handleSubmit(onSubmit)}
					>
						<Text style={styles.saveButtonText}>Зберегти зміни</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ModalInCenter>
	)
}
