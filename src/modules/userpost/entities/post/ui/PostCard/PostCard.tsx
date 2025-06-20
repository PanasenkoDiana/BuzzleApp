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
import { useState, useRef } from "react";
import { styles } from "./PostCard.styles";
import { COLORS } from "../../../../../../shared/ui/colors";
import { IImage, ITag } from "../../../../types";
import { SERVER_HOST } from "../../../../../../shared/constants";
import { useUserContext } from "../../../../../auth/context/userContext";
import { IUser } from "../../../../../auth/types";
import { usePost } from "../../../../hooks";
import { IPost } from "../../../../types/post";
import { DeletePostModal } from "../DeletePostModal";
import { DeletePostModalResult } from "../DeletePostModalResult";
import { Link } from "expo-router";

interface IPostCardProps extends IPost {
	onDeleted?: (id: number) => void;
}

const images: IImage[] = [
	{
		id: 1,
		filename:
			"https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg",
		file: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg",
		uploadedAt: new Date(),
		avatar: null,
		userId: null,
		user: null,
		postId: null,
		post: null,
	},
	{
		id: 2,
		filename:
			"https://upload.wikimedia.org/wikipedia/commons/e/e9/Goldfish3.jpg",
		file: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Goldfish3.jpg",
		uploadedAt: new Date(),
		avatar: null,
		userId: null,
		user: null,
		postId: null,
		post: null,
	},
	{
		id: 3,
		filename:
			"https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg",
		file: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg",
		uploadedAt: new Date(),
		avatar: null,
		userId: null,
		user: null,
		postId: null,
		post: null,
	},
];

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
		<View>
			<View style={styles.cardContainer}>
				<View style={styles.userInfo}>
					<Image
						source={{
							uri: `https://th.bing.com/th/id/OIP.Ur8PE60ZqDa7ExvuFqIwJAHaFj?o=7rm=3&rs=1&pid=ImgDetMain`,
						}}
						style={styles.avatar}
					/>
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
					<Text style={styles.postDescription}>
						{props.content}
						{props.links && props.links.length > -1 ? (
							<Text style={styles.link}>
								{"\n"}
								Посилання:{" "}
								{props.links?.map((link) => (
									<Link href={link.url} />
								))}
							</Text>
						) : (
							null
						)}

						{props.tags && props.tags.length > 0 ? (
							<Text style={styles.postTags}>
								{"\n"}
								{props.tags?.map((tag) => `${tag.name} `)}
							</Text>
						) : (
							null
						)}
					</Text>

					{images && images.length > 0 ? (
						<View style={styles.imageGrid}>
							{images?.map((image) => {
								const imagesCount = images?.length;

								let imageStyle = styles.gridImage;
								if (imagesCount === 1)
									imageStyle = styles.fullWidthImage;
								else if (imagesCount === 2)
									imageStyle = styles.halfWidthImage;

								return (
									<Image
										source={{
											uri: image.file,
										}}
										style={imageStyle}
										resizeMode="cover"
									/>
								);
							})}
						</View>
					) : null}

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

			{/* Модальное меню */}
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
						{/* Другие действия */}
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
			/>

			<DeletePostModalResult
				id={props.id}
				title={props.title}
				onClose={() => {
					setResultVisible(false);
					setStatus(0);
				}}
				isVisible={resultVisible}
				status={status}
			/>
		</View>
	);
}
