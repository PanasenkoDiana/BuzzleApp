import { ReactNode } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./FriendsLayout.styles";

interface IFriendsLayout {
	selectedPage: string;
	setSelectedPage: (page: string) => void;
	children: ReactNode;
}

export function FriendsLayout(props: IFriendsLayout) {
	return (
		<View>
			<View style={styles.container}>
				<View style={styles.navContainer}>

					<TouchableOpacity
						onPress={() => props.setSelectedPage("all")}
						style={[
							styles.navButtom,
							props.selectedPage === "all" &&
								styles.selectedBlock,
						]}
					>
						<Text style={styles.navText}>Всі друзі</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => props.setSelectedPage("recommends")}
						style={[
							styles.navButtom,
							props.selectedPage === "recommends" &&
								styles.selectedBlock,
						]}
					>
						<Text style={styles.navText}>Рекомендації</Text>
					</TouchableOpacity>

				</View>
				<View style={styles.navContainer}>

					<TouchableOpacity
						onPress={() => props.setSelectedPage("requests")}
						style={[
							styles.navButtom,
							props.selectedPage === "requests" &&
								styles.selectedBlock,
						]}
					>
						<Text style={styles.navText}>Запити</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => props.setSelectedPage("myRequests")}
						style={[
							styles.navButtom,
							props.selectedPage === "myRequests" &&
								styles.selectedBlock,
						]}
					>
						<Text style={styles.navText}>Мої запити</Text>
					</TouchableOpacity>

				</View>
			</View>
			{props.children}
		</View>
	);
}
