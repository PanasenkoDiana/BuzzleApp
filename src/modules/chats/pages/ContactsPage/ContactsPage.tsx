import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	Image,
	ScrollView,
} from "react-native";
import { IContact } from "../../types/types";
import { styles } from "./ContactsPage.styles";
import { Input } from "../../../../shared/ui/input";
import { SearchIcon } from "../../../../shared/ui/icons";
import { COLORS } from "../../../../shared/ui/colors";
import { useState } from "react";

interface ContactsPageProps {
	contacts: IContact[];
}

export function ContactsPage(props: ContactsPageProps) {
	const [searchText, setSearchText] = useState("");

	const lowerInput = searchText.toLowerCase();

	const filteredContacts = props.contacts
		.map((contact) => {
			const fullName =
				contact.name && contact.surname
					? `${contact.name} ${contact.surname}`.toLowerCase()
					: "";

			if (lowerInput.includes("@")) {
                let username = `@${contact.username}`;
                let lower = lowerInput.replace("@", "")
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

	return (
		<View style={styles.container}>
			<Input
				rightIcon={<SearchIcon fill={COLORS.gray} />}
				placeholder="Пошук"
				onChangeText={setSearchText}
				value={searchText}
			/>
			<FlatList
				data={filteredContacts}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.contact}>
						<Image
							source={{
								uri:
									item.profileImage ||
									"https://www.gravatar.com/avatar/",
							}}
							style={styles.contactImage}
						/>
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
