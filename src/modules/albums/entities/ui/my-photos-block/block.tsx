import { View, Text, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { GalleryIcon } from "../../../../../shared/ui/icons";
import { AlbumImage } from "../album-image";
import { SERVER_HOST } from "../../../../../shared/constants";
import { useUserContext } from "../../../../auth/context/userContext";
import { styles } from "./block.styles";
import { COLORS } from "../../../../../shared/ui/colors";
import { IMyPhotosList } from "../../../types";
import { launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import { useCreateMyPhotos } from "../../../hooks/useCreateMyPhotos";
import { Avatar } from "../../../../auth/types";
import { useDeleteMyPhoto } from "../../../hooks/useDeleteMyPhoto";
import { useState } from "react";
import { useAllMyPhotos } from "../../../hooks/useAllMyPhotos";




export function MyPhotosBlock(){


    // const { user } = useUserContext()

    const { myPhotos, refetch: getMyPhotos } = useAllMyPhotos()

    const [refresh, setRefresh] = useState(false);

    
    
    const { deleteFunction } = useDeleteMyPhoto()
    
    const { refetch } = useCreateMyPhotos()
    
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
                return base64img
                // setImage(base64img)
            }
        }
    }
    


    const onRefresh = async () => {
        setRefresh(true);
        try {
            await getMyPhotos();
        } catch (e) {
            console.error("Ошибка при рефреше альбомов", e);
        } finally {
            setRefresh(false);
        }
    };



    async function uploadMyPhoto(){
        const photo = await onSearch()

        if (!photo) return

        await refetch(photo)

    }

    return(
        <View style={styles.partView}>
            <View style={styles.partHeader}>
                <Text style={styles.myPhotosTitle}>Мої фото</Text>

                <TouchableOpacity style={styles.addPhotoButton}
                onPress={()=>uploadMyPhoto()}
                >
                    <GalleryIcon
                        width={20}
                        height={20}
                        stroke={COLORS.darkPlum}
                    />
                    <Text style={styles.addPhotosButtonText}>
                        Додати фото
                    </Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={myPhotos}
                keyExtractor={(image) => image.id.toString()}

                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }

                // ListHeaderComponent={<AlbumImage image={`${SERVER_HOST}media/${props.images}`} />}
                renderItem={({item})=> (
                    <AlbumImage.Small image={`${SERVER_HOST}media/${item.image?.filename}`} id={item.id} deleteFunction={deleteFunction} />
                )}
                style= {{width: '100%', flexWrap: 'wrap', gap: 10, flexDirection:'row', justifyContent: 'flex-start'}}
            />
            {/* <View style={styles.myPhotosList}>

                <AlbumImage image={`${SERVER_HOST}media/${user?.profileImage}`} />
            </View> */}
        </View>
    )
}