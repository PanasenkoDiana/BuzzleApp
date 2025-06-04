import { View, Text, Image, FlatList, TouchableOpacity, Modal, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";

import { styles } from "./PostCard.styles";
import { COLORS } from "../../../../../../shared/ui/colors";
import { IImage, ITag } from "../../../../types";
import { SERVER_HOST } from "../../../../../../shared/constants";
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
    id
}: PostCardProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const threeDotsRef = useRef(null);

    const handleEdit = async () => {
        setModalVisible(false);
        try {
            const response = await fetch(`${SERVER_HOST}api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    tags: tags?.map(tag => tag.id)
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            Alert.alert("Успіх", "Пост успішно оновлено");
        } catch (error) {
            Alert.alert("Помилка", "Не вдалося оновити пост");
            console.error('Error updating post:', error);
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
                            const response = await fetch(`${SERVER_HOST}api/posts/${id}`, {
                                method: 'DELETE',
                            });

                            if (!response.ok) {
                                throw new Error('Failed to delete post');
                            }

                            Alert.alert("Видалено", "Допис успішно видалено");
                        } catch (error) {
                            Alert.alert("Помилка", "Не вдалося видалити пост");
                            console.error('Error deleting post:', error);
                        }
                    }
                }
            ]
        );
    };

    const openMenu = () => {
        if (threeDotsRef.current) {
            threeDotsRef.current.measure((fx, fy, width, height, px, py) => {
                setMenuPosition({ top: py + height, right: 20 });
                setModalVisible(true);
            });
        } else {
            setModalVisible(true);
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
                    <View>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={styles.signature}>✎</Text>
                    </View>
                    <TouchableOpacity
                        ref={threeDotsRef}
                        style={{ marginLeft: 'auto', padding: 8 }}
                        onPress={openMenu}
                    >
                        <Ionicons name="ellipsis-vertical" size={22} color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postDescription}>
                {description}
                {'\n'}
                <Text style={styles.postTags} >
                {tags?.map((tag)=>{
                    return `${tag.name} ` 
                })}
                </Text>
                {/* {tags?.map((tag)=>{
                    return <Text>{tag.name}</Text>
                })} */}

            </Text>

            <View style={styles.imageGrid}>
                {images?.map((imageUrl, index) => (
                    <Image
                        key={imageUrl.id}
                        source={{ uri: `${SERVER_HOST}media/${imageUrl.name}` }}
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
                    <View style={{ position: 'absolute', top: menuPosition.top, right: menuPosition.right, backgroundColor: '#f6f3fa', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 5, minWidth: 180 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }} onPress={handleEdit}>
                            <Ionicons name="pencil-outline" size={18} color={COLORS.black} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: COLORS.black }}>Редагувати допис</Text>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: COLORS.lightGray, marginVertical: 4 }} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }} onPress={handleDelete}>
                            <Ionicons name="trash-outline" size={18} color={COLORS.red} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: COLORS.red }}>Видалити публікацію</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}