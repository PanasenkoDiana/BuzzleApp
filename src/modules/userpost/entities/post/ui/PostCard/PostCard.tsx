import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./PostCard.styles";
import { COLORS } from "../../../../../../shared/ui/colors";
interface PostCardProps {
    username: string;
    avatarUrl: string;
    title: string;
    description: string;
    images: string[];
    likes: number;
    views: number;
}

export function PostCard({
    username,
    avatarUrl,
    title,
    description,
    images,
    likes,
    views
}: PostCardProps) {
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
                </View>
            </View>

            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postDescription}>{description}</Text>

            <View style={styles.imageGrid}>
                {images.map((imageUrl, index) => (
                    <Image
                        key={index}
                        source={{ uri: imageUrl }}
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
        </View>
    );
}