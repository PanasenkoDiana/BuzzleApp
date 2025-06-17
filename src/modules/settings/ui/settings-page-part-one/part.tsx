import { View, Text, Image, TouchableOpacity } from "react-native"
import { styles } from "./part.styles"
import { SettingsChangeHeader } from "../settings-change-header"
import { useUserContext } from "../../../auth/context/userContext"
import { SERVER_HOST } from "../../../../shared/constants"
import { useEffect, useState } from "react"
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

    useEffect(() => {
        if (!user) return
        setImage(null)
    }, [user])

    async function onSearch() {
        const result = await requestMediaLibraryPermissionsAsync()
        if (result.status === "granted") {
            const images = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: true,
                allowsMultipleSelection: false,
                selectionLimit: 1,
                base64: true,
            })

            if (!images.canceled && images.assets && images.assets.length > 0) {
                // берем чистый base64 без префикса
                const base64img = images.assets[0].base64 ?? null
                setImage(base64img)
            }
        }
    }

    async function onSubmit(data: IChangeUserPartOne) {
        if (!image) return
        if (!user) return

        try {
            const response = await changeUserPartOne(
                { ...data, profileImage: image },
                user.id
            )

            if (response.status === "error") {
                console.error("Ошибка при обновлении пользователя:", response.message)
            } else {
                console.log("Профиль обновлен")
            }
        } catch (err) {
            console.error("Ошибка при отправке данных:", err)
        }
    }

    useEffect(() => {
        const submitIfNeeded = async () => {
            if (!isRedact && image) {
                await onSubmit({ profileImage: image })
            }
        }
        submitIfNeeded()
    }, [isRedact])
    const imageUri = image
        ? `data:image/png;base64,${image}`
        : user?.profileImage
        ? `${SERVER_HOST}media/${user.profileImage}`
        : undefined

    return (
        <View style={styles.changeSettingsBlock}>
            <SettingsChangeHeader
                title={"Картка профілю"}
                onRedact={() => setIsRedact(!isRedact)}
            />
            <View style={styles.profileAvatar}>
                <TouchableOpacity
                    disabled={!isRedact}
                    onPress={onSearch}
                >
                    <Image
                        style={styles.profileAvatarImage}
                        source={{
                            uri: imageUri,
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.profileAvatarName}>
                    {user?.name} {user?.surname}
                </Text>
                <Text style={styles.profileAvatarIndex}>
                    @{user?.username}
                </Text>
            </View>
        </View>
    )
}
