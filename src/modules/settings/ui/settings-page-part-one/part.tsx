import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./part.styles";
import { SettingsChangeHeader } from "../settings-change-header";
import { useUserContext } from "../../../auth/context/userContext";
import { SERVER_HOST } from "../../../../shared/constants";
import { useEffect, useState } from "react";
import {
    launchImageLibraryAsync,
    MediaTypeOptions,
    requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { IChangeUserPartOne } from "../../../auth/types";

export function SettingsPagePartOne() {
    const { user, changeUserPartOne, getToken } = useUserContext();
    const [isRedact, setIsRedact] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    // Загружаем аватар при появлении user
    useEffect(() => {
        if (!user) return;

        const avatars = user?.Profile?.avatars;
        const lastAvatar = avatars && avatars.length > 0 ? avatars[avatars.length - 1] : null;
        const avatarFilename = lastAvatar?.image?.filename;
        const profileImage = user?.profileImage;

        if (avatarFilename) {
            setImage(`${SERVER_HOST}media/${avatarFilename}`);
        } else if (profileImage) {
            setImage(`${SERVER_HOST}media/${profileImage}`);
        } else {
            setImage(`${SERVER_HOST}media/default-avatar.jpg`);
        }
    }, [user]);


    async function onSearch() {
        const result = await requestMediaLibraryPermissionsAsync();
        if (result.status === "granted") {
            const images = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: true,
                allowsMultipleSelection: false,
                selectionLimit: 1,
                base64: true,
            });

            if (!images.canceled && images.assets && images.assets.length > 0) {
                const base64img = `data:image/jpeg;base64,${images.assets[0].base64}`;
                setImage(base64img);
            }
        }
    }

    async function onSubmit(data: IChangeUserPartOne) {
        if (!image || !user) return;

        try {
            const token = await getToken() 
            if (!token) return
            if (token.status === 'error') return console.error("Ошибка токена")
            const response = await changeUserPartOne(data, token.data);
            if (response.status === "error") {
                console.error("Ошибка при обновлении пользователя:", response.message);
            } else {
                console.log("Профиль обновлен");
            }
        } catch (err) {
            console.error("Ошибка при отправке данных:", err);
        }
    }

    // Сохраняем изменения при выходе из режима редактирования
    useEffect(() => {
        const submitIfNeeded = async () => {
            if (!isRedact && image) {
                await onSubmit({ profileImage: image });
            }
        };

        submitIfNeeded();
    }, [isRedact]);

    return (
        <View style={styles.changeSettingsBlock}>
            <SettingsChangeHeader
                title={"Картка профілю"}
                onRedact={() => setIsRedact(!isRedact)}
            />
            <View style={styles.profileAvatar}>
                <TouchableOpacity disabled={!isRedact} onPress={onSearch}>
                    <Image
                        style={styles.profileAvatarImage}
                        source={{
                            uri: image ?? `${SERVER_HOST}media/default-avatar.jpg`,
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
    );
}
