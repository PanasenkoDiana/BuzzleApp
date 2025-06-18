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

	const data = props.isMyPosts ? myPosts : posts;

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
				data={data}
				keyExtractor={(post) => post.id.toString()}
				refreshing={refresh}
				refreshControl={
					<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
				}
				ListHeaderComponent={props.haveHeader ? <Main /> : null}
				renderItem={({ item }) => (
					<PostCard
						id={item.id}
						postUser={item.author}
						title={item.name}
						tags={item.tags}
						description={item.content}
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
