import { View, Text, FlatList } from "react-native";
import { IconButton } from "../../../../../shared/ui/icon-button";
import { PlusIcon } from "../../../../../shared/ui/icons";
import { COLORS } from "../../../../../shared/ui/colors";
import { AlbumImage } from "../album-image";
import { SERVER_HOST } from "../../../../../shared/constants";
import { styles } from "./card.styles";
import { Ionicons } from "@expo/vector-icons";
import { IAlbum } from "../../../types";
import { launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import { useAddAlbumPhoto } from "../../../hooks/useAddAlbumPhoto";



export function AlbumCard(props: IAlbum){
    // const [image,setImage]
    const { refetch } = useAddAlbumPhoto()

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


    return(
        <View style={styles.partView}>
            {/* <View style={styles.partHeader}>
                <Text style={styles.albumsHeaderTitle}>Немає ще жодного альбому</Text>
                <IconButton onPress={()=>{console.log()}} icon={<PlusIcon width={20} height={20} fill={COLORS.darkPlum} />} />
            </View> */}
            <View style={styles.partHeader}>
                <Text style={styles.albumsHeaderTitle}>{props.name}</Text>
                <View style={{flexDirection: 'row', gap: 10, alignItems:'center'}}>
                    <IconButton
                        onPress={() => {
                            console.log();
                        }}
                        icon={
                            <PlusIcon
                                width={20}
                                height={20}
                                fill={COLORS.darkPlum}
                            />
                        }
                    />
                    <Ionicons
                        name="ellipsis-vertical"
                        size={22}
                        color={COLORS.black}
                    />
                </View>
            </View>
            <View style={{width: '100%', gap: 10}}>
                <View style={styles.albumTextInfo}>
                    <Text style={styles.albumTextInfoTheme}>{props.theme}</Text>
                    <Text style={styles.albumTextInfoYear}>{props.year}</Text>
                </View>
                <View style={styles.albumPhotosList}>
                    <Text style={styles.albumPhotosTitle}>Фотографії</Text>
                    <FlatList 
                    style= {{width: '100%', flexWrap: 'wrap', gap: 10, flexDirection:'row'}}

                    data={props.images}
                    
                    keyExtractor={(item) => item.id.toString()}

                    renderItem={({ item}) => (
                        <AlbumImage.Small image={`${SERVER_HOST}media/${item.filename}`} />
                    )}
                    ListFooterComponent={() => (
                        <AlbumImage.Add onPress={async ()=>{
                            const base64 = await onSearch()
                            if (!base64) return

                            await refetch({image: base64, id: props.id})

                        }}  />
                    ) }
                    ></FlatList>
                </View>
            </View>
        </View>
    )
}