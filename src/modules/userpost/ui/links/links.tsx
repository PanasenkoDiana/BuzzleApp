import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { useState } from "react";
import { styles } from "./links.styles";
import { MinusIcon, PlusIcon } from "../../../../shared/ui/icons";
import { COLORS } from "../../../../shared/ui/colors";

export interface ILink {
	id: number;
	url: string;
}

interface ILinksProps {
	onChange: (links: string[]) => void;
}

export function Links({ onChange }: ILinksProps) {
	const [links, setLinks] = useState<ILink[]>([{ id: 0, url: "" }]);
	const [nextId, setNextId] = useState(1);

	function handleAddLink() {
		const newLink = [...links, { id: nextId, url: "" }];
		setLinks(newLink);
		setNextId(nextId + 1);

		const linksOnly = newLink.map((link) => link.url);
		onChange(linksOnly);
	}

	function handleRemoveLink(id: number) {
		const newLink = links.filter((link) => link.id !== id);
		setLinks(newLink);

		const linksOnly = newLink.map((link) => link.url);
		onChange(linksOnly);
	}

	function handleChangeLink(id: number, value: string) {
		const newLink = links.map((link) =>
			link.id === id ? { ...link, url: value } : link
		);
		setLinks(newLink);

		const linksOnly = newLink.map((link) => link.url);
		onChange(linksOnly);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Посилання</Text>
			<View style={styles.linksContainer}>
				{links.map((link) => (
					<View key={link.id} style={styles.link}>
						<View style={styles.input}>
							<Input
								value={link.url}
								onChangeText={(value) =>
									handleChangeLink(link.id, value)
								}
								placeholder="Напишіть посилання на ресурс"
							/>
						</View>
						{link.id === 0 ? (
							links.length >= 5 ? null : (
								<TouchableOpacity
									onPress={() => handleAddLink()}
									style={styles.button}
								>
									<PlusIcon
										width={13}
										height={13}
										fill={COLORS.black}
									/>
								</TouchableOpacity>
							)
						) : (
							<TouchableOpacity
								onPress={() => handleRemoveLink(link.id)}
								style={styles.button}
							>
								<MinusIcon
									width={25}
									height={25}
									fill={COLORS.black}
								/>
							</TouchableOpacity>
						)}
					</View>
				))}
			</View>
		</View>
	);
}
