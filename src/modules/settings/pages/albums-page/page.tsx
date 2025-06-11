import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { SettingsHeader } from "../../ui/settings-header/header";
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
import { AlbumImage } from "../../ui/album-image";

export function Albums() {
	const { user } = useUserContext();
	const userPhoto = user?.profileImage as string;

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
					<View style={styles.myPhotosList}>
                        <AlbumImage image={`${SERVER_HOST}media/${user?.profileImage}`} />
					</View>
				</View>

				<View style={styles.partView}>
					{/* <View style={styles.partHeader}>
                        <Text style={styles.albumsHeaderTitle}>Немає ще жодного альбому</Text>
                        <IconButton onPress={()=>{console.log()}} icon={<PlusIcon width={20} height={20} fill={COLORS.darkPlum} />} />
                    </View> */}
					<View style={styles.partHeader}>
						<Text style={styles.albumsHeaderTitle}>Настрій</Text>
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
							<Text style={styles.albumTextInfoTheme}>Природа</Text>
                            <Text style={styles.albumTextInfoYear}>2025 рік</Text>
						</View>
                        <View style={styles.albumPhotosList}>
                            <Text style={styles.albumPhotosTitle}>Фотографії</Text>
                            <View style={{width: '100%', flexWrap: 'wrap', gap: 10, flexDirection:'row'}}>
                                <AlbumImage.Small image={`${SERVER_HOST}media/${user?.profileImage}`} />
                                <AlbumImage.Small image={`${SERVER_HOST}media/${user?.profileImage}`} />
                                <AlbumImage.Add  />
                            </View>
                        </View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
