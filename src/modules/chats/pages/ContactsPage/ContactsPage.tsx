import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Image,
	ScrollView,
} from "react-native";
import { Contact } from "../../types/types";
import { styles } from "./ContactsPage.styles";
import { Input } from "../../../../shared/ui/input";
import { SearchIcon } from "../../../../shared/ui/icons";
import { COLORS } from "../../../../shared/ui/colors";
import { useState } from "react";
import { IUser } from "../../../auth/types";
import { SERVER_HOST } from "../../../../shared/constants";
import { DefaultAvatar } from "../../../../shared/ui/images";
import { useRouter } from "expo-router";
interface ContactsPageProps {
	contacts: IUser[];
}

export function ContactsPage(props: ContactsPageProps) {
	const [searchText, setSearchText] = useState("");
	const router = useRouter();

	const lowerInput = searchText.toLowerCase();

	const filteredContacts = props.contacts
		.map((contact) => {
			const fullName =
				contact.name && contact.surname
					? `${contact.name} ${contact.surname}`.toLowerCase()
					: "";

			if (lowerInput.includes("@")) {
				let username = `@${contact.username}`;
				let lower = lowerInput.replace("@", "");
				if (username.toLowerCase().includes(lower)) {
					return contact;
				} else {
					return null;
				}
			} else {
				if (
					(contact.name &&
						contact.name.toLowerCase().includes(lowerInput)) ||
					(contact.surname &&
						contact.surname.toLowerCase().includes(lowerInput)) ||
					contact.username.toLowerCase().includes(lowerInput) ||
					fullName.includes(lowerInput)
				) {
					return contact;
				} else {
					return null;
				}
			}
		})
		.filter((contact) => contact !== null);

	const sortedContacts = filteredContacts.sort((a, b) => {
		const nameA = a.name || "";
		const nameB = b.name || "";
		const surnameA = a.surname || "";
		const surnameB = b.surname || "";
		const usernameA = a.username || "";
		const usernameB = b.username || "";

		const priorityA = nameA ? 0 : surnameA ? 1 : 2;
		const priorityB = nameB ? 0 : surnameB ? 1 : 2;

		if (priorityA !== priorityB) {
			return priorityA - priorityB;
		}

		if (nameA > nameB) return 1;
		if (nameA < nameB) return -1;

		if (surnameA > surnameB) return 1;
		if (surnameA < surnameB) return -1;

		if (usernameA > usernameB) return 1;
		if (usernameA < usernameB) return -1;

		return 0;
	});

	return (
		<View style={styles.container}>
			<Input
				rightIcon={<SearchIcon fill={COLORS.gray} />}
				placeholder="Пошук"
				onChangeText={setSearchText}
				value={searchText}
			/>
			<FlatList
				data={sortedContacts}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.contact}
						onPress={() =>
							router.push( {
								pathname:"/chat",
								params:{
								recipientId: item.id,
								recipientUsername: item.username,
								recipientName: `${
									item.name || ""
								} ${item.surname || ""}`.trim() || `@${item.username}`,},
							})
						}
					>
						{item?.Profile?.avatars?.length > 0 &&
						item.Profile.avatars[item.Profile.avatars.length - 1]
							?.image ? (
							<Image
								source={{
									uri: `${SERVER_HOST}media/${
										item.Profile.avatars[
											item.Profile.avatars.length - 1
										].image.filename
									}`,
								}}
								style={styles.contactImage}
							/>
						) : (
							<DefaultAvatar style={styles.contactImage} />
						)}
						<View style={styles.contactInfo}>
							{item.name || item.surname ? (
								item.name ? (
									<>
										<Text style={styles.contactName}>
											{item.name} {item.surname || ""}
										</Text>
										<Text style={styles.contactUsername}>
											@{item.username}
										</Text>
									</>
								) : (
									<>
										<Text style={styles.contactName}>
											{item.surname}
										</Text>
										<Text style={styles.contactUsername}>
											@{item.username}
										</Text>
									</>
								)
							) : (
								<Text style={styles.contactName}>
									@{item.username}
								</Text>
							)}
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
