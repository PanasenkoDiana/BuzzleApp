import { FlatList, ScrollView, Text, View, ActivityIndicator, TouchableOpacity, RefreshControl, Image } from "react-native";
import { PostCard } from "../../entities/post/ui/PostCard";
import { styles } from "./UserPost.styles";
import { useEffect, useState } from "react";
import { usePost } from "../../hooks";

export default function UserPost() {
    const { posts, isLoading, getAllPosts } = usePost();
    const [refresh, setRefresh] = useState(false);
    const [key, setKey] = useState(0);

    function onRefresh() {
        setRefresh(true);
        setTimeout(() => { setRefresh(false); }, 2000);
    }

    useEffect(() => {
        // console.log(isLoading)
    }, [isLoading]);

    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.container}>
            {/* <RefreshControl refreshing={refresh} onRefresh={()=>getAllPosts()}> */}
                <FlatList
                    refreshing = {isLoading}
                    // onref
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={()=>getAllPosts()}/>}
                    key={key}
                    data={posts}
                    keyExtractor={(post, index) => post.id.toString()}
                    extraData={refresh}
                    // contentContainerStyle={{ flex: 1 }}
                    renderItem={({ item, index }) => (
                        <PostCard
                            // key={post.id}
                            id={item.id}
                            username={"1"}
                            avatarUrl={"1"}
                            title={item.name}
                            tags={item.tags}
                            description={item.text}
                            images={item.images}
                            likes={1}
                            views={2}
                        />
                    )}
                />
            {/* </RefreshControl> */}
            {/* <TouchableOpacity onPress={()=>getAllPosts()}><Text>Get all post</Text></TouchableOpacity> */}
        </View>
    );
}