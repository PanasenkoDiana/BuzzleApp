import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
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


interface PostCardProps {
  id: number;
  postUser: IUser;
  title: string;
  tags?: ITag[];
  description?: string;
  images?: IImage[];
  likes: number;
  views: number;
  onDeleted?: (id: number) => void;
}

export function PostCard({
  postUser,
  title,
  tags,
  description,
  images = [],
  likes,
  views,
  id,
  onDeleted,
}: PostCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const threeDotsRef = useRef(null);


	useEffect(()=>{
		console.log("post user:",postUser,
	title,
	tags,
	description,
	images,
	likes,
	views,
	id,
	onDeleted,)
	},[])

	const handleEdit = async () => {
		setModalVisible(false);
		try {
			const response = await fetch(`${SERVER_HOST}api/posts/change`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id,
					name: title,
					text: description,
					tags: tags?.map((tag) => tag.name),
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to update post");
			}

			Alert.alert("Успіх", "Пост успішно оновлено");
		} catch (error) {
			Alert.alert("Помилка", "Не вдалося оновити пост");
			console.error("Error updating post:", error);
		}
	};

  const handleDelete = () => {
    setModalVisible(false);
    Alert.alert(
      "Видалення допису",
      "Ви впевнені, що хочете видалити цей допис?",
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await deletePost(id);
              if (result?.status === "success") {
                Alert.alert("Видалено", "Допис успішно видалено");
                if (onDeleted) onDeleted(id);
              } else {
                Alert.alert("Помилка", result?.message || "Не вдалося видалити пост");
              }
            } catch (error) {
              Alert.alert("Помилка", "Не вдалося видалити пост");
              console.error("Error deleting post:", error);
            }
          },
        },
      ]
    );
  };

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
          setModalVisible(true);
        }
      );
    } else {
      setModalVisible(true);
    }
  };

	return (
		<View style={styles.cardContainer}>
			<View style={styles.profileContainer}>
				<View style={styles.userInfo}>
					<Image
						source={{
							uri: `${SERVER_HOST}media/${postUser.Profile.avatars[postUser.Profile.avatars.length - 1].image.filename}`,
						}}
						style={styles.avatar}
					/>
					<View>
						<Text style={styles.fullName}>
							{postUser.name} {postUser.surname}
						</Text>
						<Text style={styles.signature}>✎</Text>
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
			</View>

      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postDescription}>
        {description}
        {"\n"}
        <Text style={styles.postTags}>{tags?.map((tag) => `${tag.name} `)}</Text>
      </Text>

			<View style={styles.imageGrid}>
				{images?.map((imageUrl) => (
					<Image
						key={imageUrl.id}
						source={{ uri: `${SERVER_HOST}media/${imageUrl.filename}` }}
						style={[styles.gridImage, styles.largeImage]}
					/>
				))}
			</View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="heart-outline" size={14} color={COLORS.black} />
          <Text style={styles.statNumber}>{likes}</Text>
          <Text style={styles.statLabel}>вподобань</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="eye-outline" size={14} color={COLORS.black} />
          <Text style={styles.statNumber}>{views}</Text>
          <Text style={styles.statLabel}>переглядів</Text>
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
              // handleEdit оставил как есть
              onPress={() => {
                setModalVisible(false);
                Alert.alert("Редагування", "Функція редагування поки що не реалізована");
              }}
            >
              <Ionicons
                name="pencil-outline"
                size={18}
                color={COLORS.black}
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: COLORS.black }}>Редагувати допис</Text>
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
              onPress={handleDelete}
            >
              <Ionicons
                name="trash-outline"
                size={18}
                color={COLORS.error}
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: COLORS.error }}>Видалити публікацію</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
