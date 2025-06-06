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

    // При монтировании можно установить текущее изображение профиля
    useEffect(() => {
        if (!user) return
        // Подставляем полный URL к текущему изображению профиля с сервера
        setImage(`${SERVER_HOST}media/${user.profileImage}`)
    }, [user])

    async function onSearch() {
        const result = await requestMediaLibraryPermissionsAsync()
        if (result.status === "granted") {
            const images = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: true,
                allowsMultipleSelection: false,
                selectionLimit: 1,
                base64: true, // Важно: получить base64
            })

            if (!images.canceled && images.assets && images.assets.length > 0) {
                // Формируем base64 с префиксом для сервера
                const base64img = `data:image/jpeg;base64,${images.assets[0].base64}`
                setImage(base64img)
            }
        }
    }

    async function onSubmit(data: IChangeUserPartOne) {
        if (!image) return
        if (!user) return

        try {
            const response = await changeUserPartOne(data, user.id)
            if (response.status === "error") {
                console.error("Ошибка при обновлении пользователя:", response.message)
                // Можно показать alert или тост пользователю
            } else {
                // Обновление прошло успешно, можно обновить локальный user или что-то еще
                console.log("Профиль обновлен")
            }
        } catch (err) {
            console.error("Ошибка при отправке данных:", err)
        }
    }

    // Отправляем данные при выходе из режима редактирования
    useEffect(() => {
        const submitIfNeeded = async () => {
            if (!isRedact && image) {
                await onSubmit({ profileImage: image })
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
                    disabled={!isRedact}
                    onPress={onSearch}
                >
                    <Image
                        style={styles.profileAvatarImage}
                        source={{
                            uri: image || `${SERVER_HOST}media/${user?.profileImage}`,
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.profileAvatarName}>
                    {user?.name}
                </Text>
                <Text style={styles.profileAvatarIndex}>
                    @{user?.username}
                </Text>
            </View>
        </View>
    )
}
