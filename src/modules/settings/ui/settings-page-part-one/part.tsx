import { View, Text, Image } from "react-native"
import { styles } from "./part.styles"
import { SettingsChangeHeader } from "../settings-change-header"
import { useUserContext } from "../../../auth/context/userContext"
import { SERVER_HOST } from "../../../../shared/constants"

export function SettingsPagePartOne() {
	const { user } = useUserContext()

	return (
		<View style={styles.changeSettingsBlock}>
			<SettingsChangeHeader title={"Картка профілю"} />
			<View style={styles.profileAvatar}>
				<Image
					style={styles.profileAvatarImage}
					source={{ uri: `${SERVER_HOST}media/${user?.image}` }}
				/>
				<Text style={styles.profileAvatarName}>{user?.username}Name</Text>
				<Text style={styles.profileAvatarIndex}>@{user?.username}username</Text>
			</View>
		</View>
	)
}
