import { View, Text, TouchableOpacity } from "react-native";
import { Modal } from "../../../../../shared/ui/modal";
import { styles } from "./DeleteFriendModal.style";
import { useFriends } from "../../../hooks/useFriends";
import { useUserContext } from "../../../../auth/context/userContext";

interface IDeleteFriendModal {
	friendUsername: string;
	isVisible: boolean;
	onClose: () => void;
	setStatus: (status: number) => void;
}

export function DeleteFriendModal(props: IDeleteFriendModal) {
	const { deleteFriend } = useFriends();
	const { user } = useUserContext();

	async function onSubmit(friendUsername: string, username: string) {
		props.onClose();
		try {
			//   await deleteFriend(friendUsername, username);
			props.setStatus(1);
		} catch (error) {
			props.setStatus(2);
		}
	}

	// if (!user) {
	// 	return (
	// 		<Modal
	// 			title="Підтвердити дію"
	// 			onClose={props.onClose}
	// 			visible={props.isVisible}
	// 		>
	// 			<View style={styles.container}>
	// 				<Text style={[styles.text, {fontSize: 15}]}>Ви не увійшли до облікового запису</Text>
	// 				<TouchableOpacity
	// 					style={[styles.button, styles.rightButton]}
	// 					onPress={props.onClose}
	// 				>
	// 					<Text style={[styles.rightButtonText, styles.text]}>Ок</Text>
	// 				</TouchableOpacity>
	// 			</View>
	// 		</Modal>
	// 	);
	// }

	return (
		<Modal
			title="Підтвердити дію"
			onClose={props.onClose}
			visible={props.isVisible}
		>
			<View style={styles.container}>
				<Text style={styles.text}>
					Ви дійсно хочете видалити користувача @
					{props.friendUsername}?
				</Text>
				<View style={styles.buttons}>
					<TouchableOpacity
						style={[styles.button, styles.leftButton]}
						onPress={props.onClose}
					>
						<Text style={[styles.leftButtonText, styles.text]}>
							Скасувати
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.rightButton]}
					>
						<Text
							style={[styles.rightButtonText, styles.text]}
							onPress={() =>
								onSubmit(props.friendUsername, user?.username || "")
							}
						>
							Підтвердити
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
