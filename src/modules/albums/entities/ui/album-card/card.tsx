import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { IconButton } from "../../../../../shared/ui/icon-button";
import { EyeIcon, PlusIcon } from "../../../../../shared/ui/icons";
import { COLORS } from "../../../../../shared/ui/colors";
import { AlbumImage } from "../album-image";
import { SERVER_HOST } from "../../../../../shared/constants";
import { styles } from "./card.styles";
import { Ionicons } from "@expo/vector-icons";
import { IAlbum } from "../../../types";
import {
	launchImageLibraryAsync,
	MediaTypeOptions,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useAddAlbumPhoto } from "../../../hooks/useAddAlbumPhoto";
import { useEffect, useRef, useState } from "react";
import { UpdateAlbumModal } from "../create-album-modal";
import { useDeleteAlbumPhoto } from "../../../hooks/useDeleteAlbumPhoto";
import { useDeleteAlbum } from "../../../hooks/useDeleteAlbum";

export function AlbumCard(props: IAlbum) {
	const { refetch } = useAddAlbumPhoto();
	const [dotsModalVisible, setDotsModalVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
	const threeDotsRef = useRef(null);
	const [updateModalVisible, setUpdateModalVisible] = useState(false);
	const { deleteFunction } = useDeleteAlbumPhoto();
	const { deleteFunction: deleteAlbumFunction } = useDeleteAlbum();

	useEffect(() => {
		console.log(props.topic?.name);
	}, [props.topic]);

	const openMenu = () => {
		if (threeDotsRef.current) {
			(threeDotsRef.current as any).measure(
				(
					_fx: number,
					_fy: number,
					_width: number,
					height: number,
					_px: number,
					py: number
				) => {
					setMenuPosition({ top: py + height, right: 20 });
					setDotsModalVisible(true);
				}
			);
		} else {
			setDotsModalVisible(true);
		}
	};

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
				return base64img;
			}
		}
	}

	function formatDate(dateInput: string | number) {
		const date = new Date(dateInput);
		const months = [
			"січня",
			"лютого",
			"березня",
			"квітня",
			"травня",
			"червня",
			"липня",
			"серпня",
			"вересня",
			"жовтня",
			"листопада",
			"грудня",
		];

		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();

		return `${day} ${month} ${year} року`;
	}

	return (
		<View style={styles.partView}>
			<View style={styles.partHeader}>
				<Text style={styles.albumsHeaderTitle}>{props.name}</Text>
				<View
					style={{
						flexDirection: "row",
						gap: 10,
						alignItems: "center",
					}}
				>
					<IconButton
						onPress={() => {
							console.log();
						}}
						icon={
							<EyeIcon
								width={20}
								height={20}
								stroke={COLORS.darkPlum}
							/>
						}
					/>
					<TouchableOpacity
						ref={threeDotsRef}
						style={{ marginLeft: "auto", padding: 8 }}
						onPress={openMenu}
					>
						<Ionicons
							name="ellipsis-vertical"
							size={22}
							color={COLORS.black}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ width: "100%", gap: 10 }}>
				<View style={styles.albumTextInfo}>
					<Text style={styles.albumTextInfoTheme}>
						{props.topic?.name}
					</Text>
					<Text style={styles.albumTextInfoYear}>
						{formatDate(props.createdAt)}
					</Text>
				</View>
				<View style={styles.albumPhotosList}>
					<Text style={styles.albumPhotosTitle}>Фотографії</Text>
					<FlatList
						style={{
							width: "100%",
							flexWrap: "wrap",
							gap: 10,
							flexDirection: "row",
						}}
						data={props.images}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<AlbumImage.Small
								image={`${SERVER_HOST}media/${item.file}`}
								deleteFunction={deleteFunction}
								id={item.id}
							/>
						)}
						ListFooterComponent={() => (
							<AlbumImage.Add
								onPress={async () => {
									const base64 = await onSearch();
									if (!base64) return;
									await refetch({
										image: base64,
										id: props.id,
									});
								}}
							/>
						)}
					/>
				</View>
			</View>
			<Modal
				visible={dotsModalVisible}
				transparent
				animationType="fade"
				onRequestClose={() => {
					setDotsModalVisible(false);
				}}
			>
				<TouchableOpacity
					style={{ flex: 1 }}
					activeOpacity={1}
					onPress={() => setDotsModalVisible(false)}
				>
					<View
						style={{
							position: "absolute",
							top: menuPosition.top,
							right: menuPosition.right,
							backgroundColor: "#f6f3fa",
							borderRadius: 12,
							padding: 12,
							shadowColor: "#000",
							shadowOpacity: 0.15,
							shadowRadius: 8,
							elevation: 5,
							minWidth: 180,
						}}
					>
						<TouchableOpacity
							style={{
								flexDirection: "row",
								alignItems: "center",
								paddingVertical: 8,
							}}
						>
							<Ionicons
								name="pencil-outline"
								size={18}
								color={COLORS.black}
								style={{ marginRight: 8 }}
							/>
							<TouchableOpacity
								onPress={() => {
									setDotsModalVisible(false);
									setUpdateModalVisible(true);
								}}
							>
								<Text
									style={{
										fontSize: 16,
										color: COLORS.black,
									}}
								>
									Редагувати альбом
								</Text>
							</TouchableOpacity>
						</TouchableOpacity>

						<View
							style={{
								height: 1,
								backgroundColor: COLORS.lightGray,
								marginVertical: 4,
							}}
						/>

						<TouchableOpacity
							style={{
								flexDirection: "row",
								alignItems: "center",
								paddingVertical: 8,
							}}
							onPress={() => deleteAlbumFunction(props.id)}
						>
							<Ionicons
								name="trash-outline"
								size={18}
								color={COLORS.error}
								style={{ marginRight: 8 }}
							/>
							<Text style={{ fontSize: 16, color: COLORS.error }}>
								Видалити альбом
							</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Modal>

			{updateModalVisible && (
				<UpdateAlbumModal
					id={props.id}
					isVisible={updateModalVisible}
					onClose={() => setUpdateModalVisible(false)}
					name={props.name}
					topic={props.topic}
					createdAt={props.createdAt}
				/>
			)}
		</View>
	);
}
