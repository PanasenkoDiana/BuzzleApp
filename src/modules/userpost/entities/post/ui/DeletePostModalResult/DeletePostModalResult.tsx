import { TouchableOpacity, View, Text } from "react-native";
import { Modal } from "../../../../../../shared/ui/modal";
import { styles } from "./DeletePostModalResult.style";

interface IDeletePostModalResult {
	id: number;
	title: string;
	isVisible: boolean;
	onClose: () => void;
	status: number;
}

export function DeletePostModalResult(props: IDeletePostModalResult) {
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
						? `Ви успішно видалили пост @${props.title}`
						: `Не вдалося видалити пост @${props.title}`}
				</Text>
				<TouchableOpacity style={styles.button} onPress={props.onClose}>
					<Text style={[styles.text, styles.buttonText]}>Ок</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}
