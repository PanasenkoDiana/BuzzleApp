import { useState } from "react"
import { useUserContext } from "../../../auth/context/userContext"
import { useAllAlbums } from "../../hooks/useAllAlbums"
import { SettingsHeader } from "../../../settings/ui/settings-header"
import { MyPhotosBlock } from "../../entities/ui/my-photos-block"
import { View, Text, RefreshControl, FlatList } from "react-native"
import { PlusIcon } from "../../../../shared/ui/icons"
import { COLORS } from "../../../../shared/ui/colors"
import { IconButton } from "../../../../shared/ui/icon-button"
import { styles } from "./page.styles"
import { AlbumCard } from "../../entities/ui/album-card"

export function Albums() {
	const { user } = useUserContext()
	const [refresh, setRefresh] = useState(false)
	const avatars = user?.Profile.avatars
	// const userPhoto = user?.profileImage as string

	const { albums, refetch } = useAllAlbums()
	const [modalVisible, setModalVisible] = useState(false)

	const onRefresh = async () => {
		setRefresh(true)
		try {
			await refetch()
		} catch (e) {
			console.error("Ошибка при рефреше альбомов", e)
		} finally {
			setRefresh(false)
		}
	}




    return (
        <View  style={{flex: 1, gap: 25}}>
            <SettingsHeader selectedPage={"albums"}  />
            {/* <View style={{ gap: 15 }}> */}
            <MyPhotosBlock images={avatars ?? []} />
            {/* </View> */}

            { !albums || albums.length === 0 ?
                <View style={{ flex: 1 }}>
                    {/* <SettingsHeader selectedPage={"albums"} /> */}
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
                </View>
            :
            <FlatList
                refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
                data={albums}
                keyExtractor={(item) => item.id.toString()}
                // ListHeaderComponent={renderHeader}
                // style={{ paddingBottom: 20, gap: 15 }}
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
            }
        </View>
    )
}
