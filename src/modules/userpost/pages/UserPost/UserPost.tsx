import { FlatList, Text, View, RefreshControl } from "react-native";
import { PostCard } from "../../entities/post/ui/PostCard";
import { styles } from "./UserPost.styles";
import { useEffect, useState } from "react";
import { usePost } from "../../hooks";
import { Main } from "../../../main/ui/main";

export default function UserPost(props: {
	haveHeader: boolean;
	isMyPosts?: boolean;
}) {
	const { posts, myPosts, isLoading, getAllPosts, getMyPosts } = usePost();
	const [refresh, setRefresh] = useState(false);
	const [key, setKey] = useState(0);

	function onRefresh() {
		setRefresh(true);
		getAllPosts();
		getMyPosts();
		setTimeout(() => {
			setRefresh(false);
		}, 2000);
		console.log(posts);
	}

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

	if (props.isMyPosts) {
		return (
			<View style={styles.container}>
				<FlatList
					refreshing={refresh}
					refreshControl={
						<RefreshControl
							refreshing={refresh}
							onRefresh={onRefresh}
						/>
					}
					key={key}
					data={myPosts}
					keyExtractor={(post) => post.id.toString()}
					extraData={refresh}
					ListHeaderComponent={props.haveHeader ? <Main /> : null}
					renderItem={({ item }) => (
						<PostCard
							id={item.id}
							postUser={item.author}
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
	return (
		<View style={styles.container}>
			<FlatList
				refreshing={refresh}
				refreshControl={
					<RefreshControl
						refreshing={refresh}
						onRefresh={onRefresh}
					/>
				}
				key={key}
				data={posts}
				keyExtractor={(post) => post.id.toString()}
				extraData={refresh}
				ListHeaderComponent={props.haveHeader ? <Main /> : null}
				renderItem={({ item }) => (
					<PostCard
						id={item.id}
						postUser={item.author}
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
