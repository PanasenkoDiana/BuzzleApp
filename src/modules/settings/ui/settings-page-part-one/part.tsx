import { View, Text, Image, TouchableOpacity } from "react-native"
import { styles } from "./part.styles"
import { SettingsChangeHeader } from "../settings-change-header"
import { useUserContext } from "../../../auth/context/userContext"
import { SERVER_HOST } from "../../../../shared/constants"
import { useEffect, useState } from "react"
import { pickImage } from "../../../../shared/tools/pick-image"
import {
	launchImageLibraryAsync,
	MediaTypeOptions,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker"
import { IChangeUserPartOne } from "../../../auth/types"

export function SettingsPagePartOne() {
	const { user, changeUserPartOne } = useUserContext()
	const [isRedact, setIsRedact] = useState(false)
	const [image, setImage] = useState<string | null>(null)

	async function onSearch() {
		const result = await requestMediaLibraryPermissionsAsync()
		if (result.status === "granted") {
			const images = await launchImageLibraryAsync({
				mediaTypes: MediaTypeOptions.Images,
				allowsEditing: true,
				allowsMultipleSelection: false,
				selectionLimit: 1,
				base64: false,
			})

			if (!images.canceled && images.assets && images.assets.length > 0) {
				setImage(images.assets[0].uri)
			}
		}
	}

	async function onSubmit(data: IChangeUserPartOne) {
		if (!image) return
		const response = changeUserPartOne(data)
	}

	useEffect(() => {
		const submitIfNeeded = async () => {
			if (isRedact && image) {
				await onSubmit({ image })
			}
		}

		submitIfNeeded()
	}, [isRedact])

	return (
		<View style={styles.changeSettingsBlock}>
			<SettingsChangeHeader
				title={"Картка профілю"}
				onRedact={() => setIsRedact(!isRedact)}
			/>
			<View style={styles.profileAvatar}>
				<TouchableOpacity
					disabled={isRedact ? false : true}
					onPress={onSearch}
				>
					<Image
						style={styles.profileAvatarImage}
						source={{
							uri: !image
								? `${SERVER_HOST}media/${user?.image}`
								: image,
						}}
					/>
				</TouchableOpacity>
				<Text style={styles.profileAvatarName}>
					{user?.username}Name
				</Text>
				<Text style={styles.profileAvatarIndex}>
					@{user?.username}username
				</Text>
			</View>
		</View>
	)
}
