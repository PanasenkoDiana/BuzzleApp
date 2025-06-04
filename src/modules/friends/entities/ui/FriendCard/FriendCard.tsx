import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./FriendCard.styles";
import { IFriend } from "../../../types/friend";
import { DeleteFriendModal } from "../DeleteFriendModal/DeleteFriendModal";
import { useState } from "react";
import { PeopleIcon } from "../../../../../shared/ui/icons";
import { DeleteFriendModalResult } from "../DeleteFriendModalResult/DeleteFriendModalResult";

interface IFriendCard extends IFriend {
	variant: "friend" | "request" | "notFriend";
}

export function FriendCard(props: IFriendCard) {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [resultVisible, setResultVisible] = useState<boolean>(false);
	const [status, setStatus] = useState(0);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.friendInfo}>
				{props.profileImage ? (
					<Image
						source={{ uri: props.profileImage || "" }}
						style={styles.profileImage}
					/>
				) : (
					<PeopleIcon style={styles.profileImage} />
				)}

				<View style={styles.names}>
					<Text style={styles.name}>{props.name}</Text>
					<Text style={styles.username}>@{props.username}</Text>
				</View>
			</TouchableOpacity>

			{props.variant == "friend" && (
				<View style={styles.buttons}>
					<TouchableOpacity
						style={[styles.button, styles.leftButton]}
					>
						<Text style={styles.leftButtonText}>Повідомлення</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.rightButton]}
						onPress={() => setModalVisible(true)}
					>
						<Text style={styles.rightButtonText}>Видалити</Text>
					</TouchableOpacity>
				</View>
			)}

			{props.variant == "request" && (
				<View style={styles.buttons}>
					<TouchableOpacity
						style={[styles.button, styles.leftButton]}
					>
						<Text style={styles.leftButtonText}>Підтвердити</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.rightButton]}
						onPress={() => setModalVisible(true)}
					>
						<Text style={styles.rightButtonText}>Відхилити</Text>
					</TouchableOpacity>
				</View>
			)}

			{props.variant == "notFriend" && (
				<View style={styles.buttons}>
					<TouchableOpacity
						style={[styles.button, styles.leftButton]}
					>
						<Text style={styles.leftButtonText}>Додати</Text>
					</TouchableOpacity>
				</View>
			)}

			<DeleteFriendModal
				isVisible={modalVisible}
				onClose={() => setModalVisible(false)}
				friendUsername={props.username}
				setStatus={setStatus}
			/>
			<DeleteFriendModalResult
				friendUsername={props.username}
				onClose={() => {
					setResultVisible(false);
					setStatus(0);
				}}
				isVisible={resultVisible}
				status={status}
			/>
		</View>
	);
}
