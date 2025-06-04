import { FlatList, Text, View, RefreshControl } from "react-native";
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
    getAllPosts(); // вызываем обновление постов
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }

  useEffect(() => {
    // можно добавить логи или действия при изменении isLoading
  }, [isLoading]);

  if (isLoading && !refresh) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refresh}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        key={key}
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        extraData={refresh}
        renderItem={({ item }) => (
          <PostCard
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
