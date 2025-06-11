import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { GalleryIcon } from "../../../../../shared/ui/icons";
import { AlbumImage } from "../album-image";
import { SERVER_HOST } from "../../../../../shared/constants";
import { useUserContext } from "../../../../auth/context/userContext";
import { styles } from "./block.styles";
import { COLORS } from "../../../../../shared/ui/colors";
import { IMyPhotosList } from "../../../types";




export function MyPhotosBlock(props: IMyPhotosList){


    const { user } = useUserContext()

    return(
        <View style={styles.partView}>
            <View style={styles.partHeader}>
                <Text style={styles.myPhotosTitle}>Мої фото</Text>

                <TouchableOpacity style={styles.addPhotoButton}>
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
                data={props.images}
                keyExtractor={(image) => image.id.toString()}
                ListHeaderComponent={<AlbumImage image={`${SERVER_HOST}media/${user?.profileImage}`} />}
                renderItem={({item})=> (
                    <AlbumImage image={item.name} />
                )}
                style={{width: '100%'}}
                contentContainerStyle= {{width: '100%', flexWrap: 'wrap', gap: 10, flexDirection:'row', justifyContent: 'flex-start'}}
            />
            {/* <View style={styles.myPhotosList}>

                <AlbumImage image={`${SERVER_HOST}media/${user?.profileImage}`} />
            </View> */}
        </View>
    )
}