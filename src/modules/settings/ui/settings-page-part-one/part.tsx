import { View, Text, Image, TouchableOpacity } from "react-native"
import { styles } from "./part.styles"
import { SettingsChangeHeader } from "../settings-change-header"
import { useUserContext } from "../../../auth/context/userContext"
import { SERVER_HOST } from "../../../../shared/constants"
import { useEffect, useState } from "react"

export function SettingsPagePartOne() {
	const { user } = useUserContext()
	const [ isRedact, setIsRedact ] = useState(false)

	useEffect(()=>{console.log(isRedact)},[isRedact])

	return (
		<View style={styles.changeSettingsBlock}>
			<SettingsChangeHeader title={"Картка профілю"} onRedact={()=>setIsRedact(!isRedact)} />
			<View style={styles.profileAvatar}>
				<TouchableOpacity  disabled={isRedact ? false : true}>
				<Image
					style={styles.profileAvatarImage}
					source={{ uri: `${SERVER_HOST}media/${user?.image}` }}
				/>
				</TouchableOpacity>
				<Text style={styles.profileAvatarName}>{user?.username}Name</Text>
				<Text style={styles.profileAvatarIndex}>@{user?.username}username</Text>
			</View>
		</View>
	)
}
