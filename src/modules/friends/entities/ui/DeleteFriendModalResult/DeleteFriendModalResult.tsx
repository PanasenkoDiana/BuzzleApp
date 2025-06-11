import { TouchableOpacity, View, Text } from "react-native";
import { Modal } from "../../../../../shared/ui/modal";
import { styles } from "./DeleteFriendModalResult.style";

interface IDeleteFriendModalResult {
	username: string;
	isVisible: boolean;
	onClose: () => void;
	status: number;
}

export function DeleteFriendModalResult(props: IDeleteFriendModalResult) {
	if (props.isVisible || props.status === 0) return;

    let isSuccess
	if (props.status === 1) {
        isSuccess = true
    }

	return (
		<Modal
			title={isSuccess ? "Успіх" : "Помилка"}
			onClose={props.onClose}
			visible={true}
		>
			<View style={styles.container}>
				<Text style={styles.text}>
					{isSuccess
						? `Ви успішно видалили користувача @${props.username} з друзів`
						: `Не вдалося видалити користувача @${props.username} з друзів`}
				</Text>
				<TouchableOpacity style={styles.button} onPress={props.onClose}>
					<Text style={[styles.text, styles.buttonText]}>Ок</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}
