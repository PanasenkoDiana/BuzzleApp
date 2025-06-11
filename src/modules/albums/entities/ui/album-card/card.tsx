import { View, Text, FlatList } from "react-native";
import { IconButton } from "../../../../../shared/ui/icon-button";
import { PlusIcon } from "../../../../../shared/ui/icons";
import { COLORS } from "../../../../../shared/ui/colors";
import { AlbumImage } from "../album-image";
import { SERVER_HOST } from "../../../../../shared/constants";
import { styles } from "./card.styles";
import { Ionicons } from "@expo/vector-icons";
import { IAlbum } from "../../../types";





export function AlbumCard(props: IAlbum){


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
                    contentContainerStyle= {{width: '100%', flexWrap: 'wrap', gap: 10, flexDirection:'row'}}

                    data={props.images}
                    
                    keyExtractor={(item) => item.id.toString()}

                    renderItem={({ item}) => (
                        <AlbumImage.Small image={item.name} />
                    )}
                    ListFooterComponent={() => (
                        <AlbumImage.Add  />
                    ) }
                    ></FlatList>
                </View>
            </View>
        </View>
    )
}