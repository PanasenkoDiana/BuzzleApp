import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Modal,
	Alert,
	Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import { styles } from "./PostCard.styles";
import { COLORS } from "../../../../../../shared/ui/colors";
import { IImage, ITag } from "../../../../types";
import { SERVER_HOST } from "../../../../../../shared/constants";
import { useUserContext } from "../../../../../auth/context/userContext";
import { IUser } from "../../../../../auth/types";
import { usePost } from "../../../../hooks";
import { IPost } from "../../../../types/post";
import { DeletePostModal } from "../DeletePostModal";
import { Link } from "expo-router";
import { DefaultAvatar } from "../../../../../../shared/ui/images";

interface IPostCardProps extends IPost {
	onRefresh: () => void;
}

export function PostCard(props: IPostCardProps) {
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] =
		useState<boolean>(false);
	const [resultVisible, setResultVisible] = useState<boolean>(false);
	const [status, setStatus] = useState(0);

	const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
	const threeDotsRef = useRef(null);

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
					setMenuPosition({ top: py + height - 40, right: 30 });
					setModalVisible(true);
				}
			);
		} else {
			setModalVisible(true);
		}
	};

	return (
		<View style={styles.cardContainer}>
			<View style={styles.userInfo}>
				{props.author.Profile.avatars ? (
					<Image
						source={{
							uri: `${SERVER_HOST}media/${
								props.author.Profile.avatars[
									props.author.Profile.avatars.length - 1
								].image.filename
							}`,
						}}
						style={styles.avatar}
					/>
				) : (
					<DefaultAvatar style={styles.avatar} />
				)}

				<View>
					{props.author?.name || props.author?.surname ? (
						props.author?.name ? (
							<>
								<Text style={styles.fullName}>
									{props.author?.name}{" "}
									{props.author?.surname || ""}
								</Text>
							</>
						) : (
							<>
								<Text style={styles.fullName}>
									{props.author?.surname}
								</Text>
							</>
						)
					) : (
						<Text style={styles.fullName}>
							@{props.author?.username}
						</Text>
					)}
				</View>

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
			<View>
				<Text style={styles.postTitle}>{props.title}</Text>
				<View style={styles.textInfo}>
					<Text style={styles.postDescription}>{props.content}</Text>
					{props.tags && props.tags.length > 0 && (
						<Text style={styles.postTags}>
							{props.tags?.map((tag) => `${tag.name} `)}
						</Text>
					)}
				</View>
				<View>
					{props.images && props.images.length > 0 && (
						<View style={styles.images}>
							<View style={styles.imageGrid}>
								{props.images.slice(0, 3).map((image) => {
									const imagesCount = props.images?.length;

									let imageStyle = styles.gridImage;
									if (imagesCount === 1)
										imageStyle = styles.fullWidthImage;
									else if (imagesCount === 2)
										imageStyle = styles.halfWidthImage;

									return (
										<Image
											key={image.id}
											source={{
												uri: `${SERVER_HOST}media/${image.filename}`,
											}}
											style={imageStyle}
											resizeMode="cover"
										/>
									);
								})}
							</View>

							<View style={styles.imageGrid}>
								{props.images.slice(4, 7).map((image) => {
									const imagesCount = props.images?.length;

									let imageStyle = styles.gridImage;
									if (imagesCount === 1)
										imageStyle = styles.fullWidthImage;
									else if (imagesCount === 2)
										imageStyle = styles.halfWidthImage;

									return (
										<Image
											key={image.id}
											source={{
												uri: `${SERVER_HOST}media/${image.filename}`,
											}}
											style={imageStyle}
											resizeMode="cover"
										/>
									);
								})}
							</View>
							<View style={styles.imageGrid}>
								{props.images.slice(6, 9).map((image) => {
									const imagesCount = props.images?.length;

									let imageStyle = styles.gridImage;
									if (imagesCount === 1)
										imageStyle = styles.fullWidthImage;
									else if (imagesCount === 2)
										imageStyle = styles.halfWidthImage;

									return (
										<Image
											key={image.id}
											source={{
												uri: `${SERVER_HOST}media/${image.filename}`,
											}}
											style={imageStyle}
											resizeMode="cover"
										/>
									);
								})}
							</View>

							<View style={styles.imageGrid}>
								{props.images.slice(9).map((image) => {
									const imagesCount = props.images?.length;

									let imageStyle = styles.gridImage;
									if (imagesCount === 1)
										imageStyle = styles.fullWidthImage;
									else if (imagesCount === 2)
										imageStyle = styles.halfWidthImage;

									return (
										<Image
											key={image.id}
											source={{
												uri: `${SERVER_HOST}media/${image.filename}`,
											}}
											style={imageStyle}
											resizeMode="cover"
										/>
									);
								})}
							</View>
						</View>
					)}

					<View style={styles.statsContainer}>
						<View style={styles.statItem}>
							<Ionicons
								name="heart-outline"
								size={16}
								color={COLORS.black}
							/>
							<Text style={styles.statLabel}>
								{props.likes?.length || 0} вподобань
							</Text>
						</View>
						<View style={styles.statItem}>
							<Ionicons
								name="eye-outline"
								size={16}
								color={COLORS.black}
							/>
							<Text style={styles.statLabel}>
								{props.views?.length || 0} переглядів
							</Text>
						</View>
					</View>
				</View>
			</View>

			<Modal
				visible={modalVisible}
				transparent
				animationType="fade"
				onRequestClose={() => setModalVisible(false)}
			>
				<TouchableOpacity
					style={{ flex: 1 }}
					activeOpacity={1}
					onPress={() => setModalVisible(false)}
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
							onPress={() => {
								setModalVisible(false);
								Alert.alert(
									"Редагування",
									"Функція редагування поки що не реалізована"
								);
							}}
						>
							<Ionicons
								name="pencil-outline"
								size={18}
								color={COLORS.black}
								style={{ marginRight: 8 }}
							/>
							<Text style={{ fontSize: 16, color: COLORS.black }}>
								Редагувати допис
							</Text>
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
							onPress={() => {
								setDeleteModalVisible(true);
								setModalVisible(false);
							}}
						>
							<Ionicons
								name="trash-outline"
								size={18}
								color={COLORS.error}
								style={{ marginRight: 8 }}
							/>
							<Text style={{ fontSize: 16, color: COLORS.error }}>
								Видалити публікацію
							</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Modal>

			<DeletePostModal
				id={props.id}
				title={props.title}
				isVisible={deleteModalVisible}
				onClose={() => setDeleteModalVisible(false)}
				setStatus={setStatus}
				onRefresh={props.onRefresh}
			/>
		</View>
	);
}
