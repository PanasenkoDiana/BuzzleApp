import { ScrollView, View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useUserContext } from "../../../auth/context/userContext";
import {
	EyeIcon,
	EyeSlashIcon,
	GalleryIcon,
	PlusIcon,
	TrashIcon,
} from "../../../../shared/ui/icons";
import { COLORS } from "../../../../shared/ui/colors";
import { IconButton } from "../../../../shared/ui/icon-button";
import { useEffect, useState } from "react";
import { Album } from "./page.types";
import { styles } from "./page.styles";
import { SERVER_HOST } from "../../../../shared/constants";
import { Ionicons } from "@expo/vector-icons";
import { SettingsHeader } from "../../../settings/ui/settings-header";
import { AlbumImage } from "../../entities/ui/album-image";
import { AlbumCard } from "../../entities/ui/album-card";
import { MyPhotosBlock } from "../../entities/ui/my-photos-block";
// import { useMyPhotos } from "../../hooks/useMyPhotos";
import { useAllAlbums } from "../../hooks/useAllAlbums";

export function Albums() {
	const { user } = useUserContext();
	const userPhoto = user?.profileImage as string;

	// const { myPhotos } = useMyPhotos()
	// const { user }

	const { albums } = useAllAlbums()
	
	const [modalVisible, setModalVisible] = useState(false);
	// const [albums, setAlbums] = useState<Album[]>([]);
	// const addAlbum = () => {
	// 	setAlbums([...albums, { id: Date.now(), photos: [] }]);
	// 	setModalVisible(false);
	// };

	return (
		<ScrollView
			style={{ flex: 1 }}
			// contentContainerStyle{{}}
		>
			<SettingsHeader selectedPage={"albums"} />

			<View style={{ flex: 1, gap: 15 }}>

				<MyPhotosBlock images={user?.images ? user.images : []} />
				
				{ albums ?
				<FlatList
				data={albums}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<AlbumCard id={item.id} name={item.name} theme={item.theme} year={item.year} images={item.images} />

				)}
				/> : 
				<View style={styles.partView}>
					<View style={styles.partHeader}>
						<Text style={styles.myPhotosTitle}>Немає ще жодного альбому</Text>

						<IconButton onPress={()=> console.log()} icon={
							<PlusIcon  
								width={20}
								height={20}
								stroke={COLORS.darkPlum}/>}/>
					</View>
				</View>
				}


				
			</View>
		</ScrollView>
	);
}
