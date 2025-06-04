import { TouchableOpacity, View, Text } from "react-native";
import { Modal } from "../../../../../shared/ui/modal";
import { styles } from "./DeleteFriendModalResult.style";

interface IDeleteFriendModalResult {
	friendUsername: string;
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
						? `Ви успішно видалили користувача @${props.friendUsername} з друзів`
						: `Не вдалося видалити користувача @${props.friendUsername} з друзів`}
				</Text>
				<TouchableOpacity onPress={props.onClose}>
					<Text style={styles.text}>Ок</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}
