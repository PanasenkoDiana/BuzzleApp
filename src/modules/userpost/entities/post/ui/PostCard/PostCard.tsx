import { View, Text, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
        </View>
    );
}