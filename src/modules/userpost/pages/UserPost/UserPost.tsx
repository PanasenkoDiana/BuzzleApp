import { FlatList, Text, View, RefreshControl } from "react-native";
import { PostCard } from "../../entities/post/ui/PostCard";
import { styles } from "./UserPost.styles";
import { useEffect } from "react";
import { usePost } from "../../hooks";
import { Main } from "../../../main/ui/main";

export default function UserPost(props: {
	haveHeader: boolean;
	isMyPosts?: boolean;
}) {
	const {
		posts,
		myPosts,
		isLoading,
		refresh,
		setRefresh,
		getAllPosts,
		getMyPosts,
	} = usePost();

	const data = props.isMyPosts ? myPosts.slice().reverse() : posts.slice().reverse();

	const onRefresh = () => {
		setRefresh(true);
		Promise.all([getAllPosts(), getMyPosts()]).finally(() =>
			setTimeout(() => setRefresh(false), 1000)
		);
	};

	useEffect(() => {
		getAllPosts();
		getMyPosts();
	}, []);

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
				data={data}
				keyExtractor={(post) => post.id.toString()}
				refreshing={refresh}
				contentContainerStyle={{ gap: 5 }}
				refreshControl={
					<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
				}
				ListHeaderComponent={props.haveHeader ? <Main /> : null}
				renderItem={({ item }) => (
					<PostCard
						id={item.id}
						author={item.author}
						title={item.title}
						content={item.content}
						links={item.links}
						tags={item.tags}
						images={item.images}
						likes={item.likes}
						views={item.views}
						onRefresh={onRefresh}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
