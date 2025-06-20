import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./part.styles";
import { SettingsChangeHeader } from "../settings-change-header";
import { useUserContext } from "../../../auth/context/userContext";
import { SERVER_HOST } from "../../../../shared/constants";
import { useEffect, useState } from "react";
import defaultAvatar from "../../../../../assets/default_avatar.png";
import {
    launchImageLibraryAsync,
    MediaTypeOptions,
    requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { IChangeUserPartOne } from "../../../auth/types";
import { Controller, useForm } from "react-hook-form";

export function SettingsPagePartOne() {
    const { user, changeUserPartOne } = useUserContext();
    const [isRedact, setIsRedact] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const { control, handleSubmit, setValue } = useForm<IChangeUserPartOne>({
        defaultValues: {
            username: user?.username ?? "",
        },
    });

    useEffect(() => {
        if (!user) return;
        setImage(null);

        // Обновляем значение username при загрузке user
        setValue("username", user?.username ?? "");
    }, [user, setValue]);

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
                const base64img = images.assets[0].base64 ?? null;
                setImage(base64img);
            }
        }
    }

    async function onSubmit(data: IChangeUserPartOne) {
        if (!user) return;

        try {
            // Если есть новая картинка, добавляем префикс, иначе отправляем null/undefined
            const base64ToSend = image
                ? image.startsWith("data:image")
                    ? image
                    : `data:image/png;base64,${image}`
                : undefined;

            const response = await changeUserPartOne(
                { ...data, profileImage: base64ToSend },
            );

            if (response.status === "error") {
                console.error("Ошибка при обновлении пользователя:", response.message);
            } else {
                console.log("Профиль обновлен");
            }
        } catch (err) {
            console.error("Ошибка при отправке данных:", err);
        }
    }

    useEffect(() => {
        const submitIfNeeded = async () => {
            if (!isRedact) {
                await handleSubmit(onSubmit)();
            }
        };
        submitIfNeeded();
    }, [isRedact, handleSubmit]);

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
                        source={
                            image
                                ? { uri: `data:image/png;base64,${image}` }
                                : user?.Profile.avatars?.[user.Profile.avatars.length - 1]
                                ? { uri: `${SERVER_HOST}media/${user.Profile.avatars[user.Profile.avatars.length - 1].image.filename}` }
                                : defaultAvatar
                        }
                    />
                </TouchableOpacity>

                <Text style={styles.profileAvatarName}>
                    {user?.name} {user?.surname}
                </Text>
                
                <Controller
                    control={control}
                    name="username"
                    render={({ field: { value, onChange } }) => (
                        <TextInput
                            style={styles.profileAvatarIndex}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

            </View>
        </View>
    );
}
