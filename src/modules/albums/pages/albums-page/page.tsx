import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
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
  const [refresh, setRefresh] = useState(false);
  const avatars = user?.Profile.avatars;

  const { albums, refetch } = useAllAlbums();
  const [modalVisible, setModalVisible] = useState(false);

  const onRefresh = async () => {
    setRefresh(true);
    try {
      await refetch();
    } catch (e) {
      console.error("Ошибка при рефреше альбомов", e);
    } finally {
      setRefresh(false);
    }
  };

  const renderHeader = () => (
    <>
      <SettingsHeader selectedPage={"albums"} />
      <View style={{ gap: 15 }}>
        <MyPhotosBlock />
      </View>
    </>
  );

  if (!albums || albums.length === 0) {
    return (
      <ScrollView style={{ flex: 1 }}>
        <SettingsHeader selectedPage={"albums"} />
        <View style={styles.partView}>
          <View style={styles.partHeader}>
            <Text style={styles.myPhotosTitle}>Немає ще жодного альбому</Text>
            <IconButton
              onPress={() => console.log()}
              icon={
                <PlusIcon width={20} height={20} stroke={COLORS.darkPlum} />
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{ paddingBottom: 20, gap: 15 }}
      renderItem={({ item }) => (
        <AlbumCard
          id={item.id}
          name={item.name}
          topic={item.topic}
          createdAt={item.createdAt}
          images={item.images}
        />
      )}
    />
  );
}