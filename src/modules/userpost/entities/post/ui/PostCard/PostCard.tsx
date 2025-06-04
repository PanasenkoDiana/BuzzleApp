import {
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity,
	Modal,
	Alert,
} from "react-native";
import { View, Text, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { useState } from "react";

import { styles } from "./PostCard.styles";
import { COLORS } from "../../../../../../shared/ui/colors";
import { IImage, ITag } from "../../../../types";
import { SERVER_HOST } from "../../../../../../shared/constants";

import { Button } from "../../../../../../shared/ui/button";
import { usePost } from "../../../../hooks";

interface PostCardProps {
	id: number;
	username?: string;
	avatarUrl?: string;
	title: string;
	tags?: ITag[];
	description?: string;
	images?: IImage[];
	likes: number;
	views: number;
	onDeleted?: (id: number) => void;
}

export function PostCard({
	username,
	avatarUrl,
	title,
	tags,
	description,
	images,
	likes,
	views,
	id,
	onDeleted,
    id,
    username,
    avatarUrl,
    title: initialTitle,
    tags,
    description: initialDescription,
    images,
    likes,
    views
}: PostCardProps) {
	const [modalVisible, setModalVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
	const threeDotsRef = useRef(null);

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
							const response = await fetch(
								`${SERVER_HOST}api/posts/delete`,
								{
									method: "DELETE",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({ id }),
								}
							);

							if (!response.ok) {
								throw new Error("Failed to delete post");
							}

							Alert.alert("Видалено", "Допис успішно видалено");
							if (onDeleted) onDeleted(id);
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
					<Image source={{ uri: avatarUrl }} style={styles.avatar} />
					<View>
						<Text style={styles.username}>{username}</Text>
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
    const [menuVisible, setMenuVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription || '');
    
    const { deletePost, changePost } = usePost();

    const handleDelete = async () => {
        try {
            await deletePost(id);
            setMenuVisible(false);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEdit = async () => {
        try {
            await changePost({
                id,
                name: title,
                text: description,
                tags,
                images
            });
            setEditModalVisible(false);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <View>
            <View style={styles.profileContainer}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: avatarUrl }}
                        style={styles.avatar}
                    />
                    <View style={{flex: 1}}>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={styles.signature}>✎</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => setMenuVisible(true)}
                    >
                        <Ionicons name="ellipsis-vertical" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

			<Text style={styles.postTitle}>{title}</Text>
			<Text style={styles.postDescription}>
				{description}
				{"\n"}
				<Text style={styles.postTags}>
					{tags?.map((tag) => `${tag.name} `)}
				</Text>
			</Text>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postDescription}>
                {description}
                {'\n'}
                <Text style={styles.postTags} >
                {tags?.map((tag)=>{
                    return `${tag.name} ` 
                })}
                </Text>
            </Text>

			<View style={styles.imageGrid}>
				{images?.map((imageUrl) => (
					<Image
						key={imageUrl.id}
						source={{ uri: `${SERVER_HOST}media/${imageUrl.name}` }}
						style={[styles.gridImage, styles.largeImage]}
					/>
				))}
			</View>

			<View style={styles.statsContainer}>
				<View style={styles.statItem}>
					<Ionicons
						name="heart-outline"
						size={14}
						color={COLORS.black}
					/>
					<Text style={styles.statNumber}>{likes}</Text>
					<Text style={styles.statLabel}>вподобань</Text>
				</View>
				<View style={styles.statItem}>
					<Ionicons
						name="eye-outline"
						size={14}
						color={COLORS.black}
					/>
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
						<TouchableOpacity
							style={{
								flexDirection: "row",
								alignItems: "center",
								paddingVertical: 8,
							}}
							onPress={handleEdit}
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
							onPress={handleDelete}
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
		</View>
	);
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

            {/* Post Menu Modal */}
            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.menuModalOverlay}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menuModalContainer}>
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                setEditModalVisible(true);
                            }}
                        >
                            <Ionicons name="pencil-outline" size={24} color={COLORS.black} style={styles.menuIcon} />
                            <Text style={styles.menuText}>Редагувати допис</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.menuDivider} />
                        
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={handleDelete}
                        >
                            <Ionicons name="trash-outline" size={24} color={COLORS.error} style={styles.menuIcon} />
                            <Text style={[styles.menuText, {color: COLORS.error}]}>Видалити публікацію</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Edit Post Modal */}
            <Modal
                visible={editModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.editModalOverlay}>
                    <View style={styles.editModalContainer}>
                        <View style={styles.editModalHeader}>
                            <Text style={styles.editModalTitle}>Редагувати допис</Text>
                            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                                <Ionicons name="close" size={24} color={COLORS.black} />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.editFormContainer}>
                            <Text style={styles.inputLabel}>Заголовок</Text>
                            <TextInput
                                style={styles.textInput}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Введіть заголовок"
                            />
                            
                            <Text style={styles.inputLabel}>Опис</Text>
                            <TextInput
                                style={[styles.textInput, styles.textArea]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Введіть опис"
                                multiline
                                numberOfLines={4}
                            />
                            
                            <Button 
                                label="Зберегти"
                                onPress={handleEdit}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
