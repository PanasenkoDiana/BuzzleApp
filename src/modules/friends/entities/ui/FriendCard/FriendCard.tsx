import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./FriendCard.styles";
import { DeleteFriendModal } from "../DeleteFriendModal";
import { useState } from "react";
import { PeopleIcon } from "../../../../../shared/ui/icons";
import { DeleteFriendModalResult } from "../DeleteFriendModalResult";
import { useUserContext } from "../../../../auth/context/userContext";
import { useFriends } from "../../../hooks/useFriends";
import { SERVER_HOST } from "../../../../../shared/constants";
import defaultAvatar from "../../../../../../assets/default_avatar.png";
import { IUser } from "../../../../auth/types";
import { DefaultAvatar } from "../../../../../shared/ui/images";
import { router } from "expo-router";

interface IFriendCard extends IUser {
	variant: "friend" | "request" | "myRequest" | "notFriend" | string;
}

export function FriendCard(props: IFriendCard) {
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [resultVisible, setResultVisible] = useState<boolean>(false);
	const [status, setStatus] = useState(0);
	const {
		getAllFriends,
		getRequests,
		getMyRequests,
		getRecommends,
		sendRequest,
		cancelRequest,
		acceptRequest,
	} = useFriends();

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.friendInfo}>
				{props?.Profile?.avatars?.length > 0 &&
				props.Profile.avatars[props.Profile.avatars.length - 1]
					?.image ? (
					<Image
						source={{
							uri: `${SERVER_HOST}media/${
								props.Profile.avatars[
									props.Profile.avatars.length - 1
								].image.filename
							}`,
						}}
						style={styles.profileImage}
					/>
				) : (
					<DefaultAvatar style={styles.profileImage} />
				)}

				<View style={styles.names}>
					{props.name ? (
						<>
							<Text style={styles.name}>
								{props.name} {props.surname}
							</Text>
							<Text style={styles.username}>
								@{props.username}
							</Text>
						</>
					) : props.surname ? (
						<>
							<Text style={styles.name}>{props.surname}</Text>
							<Text style={styles.username}>
								@{props.username}
							</Text>
						</>
					) : (
						<Text style={styles.name}>@{props.username}</Text>
					)}
				</View>
			</TouchableOpacity>

			{props.variant == "friend" && (
				<View style={styles.buttons}>
					<TouchableOpacity
						style={[styles.button, styles.leftButton]}
						onPress={() =>
							router.push({
								pathname: "/chat",
								params: {
									recipientId: props.id,
									recipientUsername: props.username,
									recipientName:
										`${props.name || ""} ${
											props.surname || ""
										}`.trim() || `@${props.username}`,
								},
							})
						}
					>
						<Text style={styles.leftButtonText}>Повідомлення</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.rightButton]}
						onPress={() => {
							setModalVisible(true);
						}}
					>
						<Text style={styles.rightButtonText}>Видалити</Text>
					</TouchableOpacity>
				</View>
			)}

			{props.variant == "request" && (
				<View style={styles.buttons}>
					<TouchableOpacity
						style={[styles.button, styles.leftButton]}
						onPress={async () => {
							await acceptRequest(props.username);
						}}
					>
						<Text style={styles.leftButtonText}>Підтвердити</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.rightButton]}
						onPress={async () => {
							await cancelRequest(props.username, true);
						}}
					>
						<Text style={styles.rightButtonText}>Відхилити</Text>
					</TouchableOpacity>
				</View>
			)}

			{props.variant == "myRequest" && (
				<View style={styles.buttons}>
					<TouchableOpacity
						style={[styles.button, styles.rightButton]}
						onPress={async () => {
							cancelRequest(props.username, false);
						}}
					>
						<Text style={styles.rightButtonText}>Скасувати</Text>
					</TouchableOpacity>
				</View>
			)}

			{props.variant == "notFriend" && (
				<View style={styles.buttons}>
					<TouchableOpacity
						style={[styles.button, styles.leftButton]}
						onPress={async () => {
							await sendRequest(props.username);
						}}
					>
						<Text style={styles.leftButtonText}>Додати</Text>
					</TouchableOpacity>
				</View>
			)}

			<DeleteFriendModal
				username={props.username}
				isVisible={modalVisible}
				onClose={() => setModalVisible(false)}
				setStatus={setStatus}
			/>
			<DeleteFriendModalResult
				username={props.username}
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
