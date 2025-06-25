import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { IAddUserToGroupModalProps } from "./modal.types";
import { SearchIcon } from "../../../../shared/ui/icons";
import { COLORS } from "../../../../shared/ui/colors";
import { useFriends } from "../../../friends/hooks/useFriends";
import { DefaultAvatar } from "../../../../shared/ui/images";
import { SERVER_HOST } from "../../../../shared/constants";
import { CustomCheckBox } from "../../../../shared/ui/custom-check-box";
import { Input } from "../../../../shared/ui/input";
import { styles } from "./modal.styles";
import { ModalInCenter } from "../../../../shared/ui/modal/modal";

export function AddUserToGroupModal(props: IAddUserToGroupModalProps) {
	const { friends, getAllFriends } = useFriends();
	const [searchText, setSearchText] = useState("");
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

	const lowerInput = searchText.toLowerCase();

	const filteredContacts = friends
		.map((friend) => {
			const fullName = friend.name && friend.surname
				? `${friend.name} ${friend.surname}`.toLowerCase()
				: "";

			if (lowerInput.includes("@")) {
				const username = `@${friend.username}`;
				const lower = lowerInput.replace("@", "");
				return username.toLowerCase().includes(lower) ? friend : null;
			}

			if (
				friend.name?.toLowerCase().includes(lowerInput) ||
				friend.surname?.toLowerCase().includes(lowerInput) ||
				friend.username.toLowerCase().includes(lowerInput) ||
				fullName.includes(lowerInput)
			) {
				return friend;
			}

			return null;
		})
		.filter((contact) => contact !== null) as typeof friends;

	const sortedContacts = filteredContacts.sort((a, b) => {
		const nameA = a.name || "";
		const nameB = b.name || "";
		return nameA.localeCompare(nameB);
	});

	useEffect(() => {
		getAllFriends();
	}, []);

	const toggleSelectUser = (id: number) => {
		setSelectedUsers((prev) =>
			prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
		);
	};

	return (
		<ModalInCenter visible={props.isVisible} onClose={props.onClose}>
			<View style={styles.container}>
				<Text style={styles.title}>Додати учасника</Text>
				
				<Input
					style={styles.searchInput}
					placeholder="Пошук"
					leftIcon={<SearchIcon fill={COLORS.gray} />}
					onChangeText={setSearchText}
					value={searchText}
				/>

				<Text style={styles.selectText}>Вибрано: {selectedUsers.length}</Text>

				<FlatList
					data={sortedContacts}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => {
						const avatar =
							item.Profile.avatars?.[item.Profile.avatars.length - 1]
								?.image?.filename;

						const isChecked = selectedUsers.includes(item.id);

						return (
							<View style={styles.userCard}>
								{avatar ? (
									<Image
										source={{ uri: `${SERVER_HOST}media/${avatar}` }}
										style={{ width: 45, height: 45, borderRadius: 1000 }}
									/>
								) : (
									<DefaultAvatar
										style={{ width: 45, height: 45, borderRadius: 100 }}
									/>
								)}

								<Text style={styles.userText}>
									{item.name} {item.surname}
								</Text>

								<View style={{ position: "absolute", right: 0 }}>
									<CustomCheckBox.variantTwo
										checked={isChecked}
										onToggle={() => toggleSelectUser(item.id)}
									/>
								</View>
							</View>
						);
					}}
				/>

				<View style={styles.buttonsBlock}>
					<TouchableOpacity style={styles.dismissButton} onPress={props.onClose}>
						<Text style={styles.dismissButtonText}>Назад</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.saveButton}
						onPress={() => {
							props.onSave(selectedUsers);
							props.onClose();
						}}
					>
						<Text style={styles.saveButtonText}>Зберегти зміни</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ModalInCenter>
	);
}
