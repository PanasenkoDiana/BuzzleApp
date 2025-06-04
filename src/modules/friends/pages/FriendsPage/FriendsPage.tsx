import { FlatList, View, Text } from "react-native";
import { useFriends } from "../../hooks/useFriends";
import { useEffect } from "react";
import { FriendCard } from "../../entities/ui/FriendCard/FriendCard";
import { styles } from "./FriendsPage.styles";

const friends = [
	{
		id: 1,
		name: "Oleg Gleborg",
		username: "oleggleb",
		profileImage:
			"https://th.bing.com/th/id/R.8787e55692cf5f7bae1973ea4d7d3432?rik=%2bsAsOdzYp7LJFA&riu=http%3a%2f%2fcoolsen.ru%2fwp-content%2fuploads%2f2021%2f11%2f79-20211129_204332.jpg&ehk=%2b6O%2f0OTZH0r69lIYcGzL1MzK5CAkHsedTHFfFu8l8pc%3d&risl=&pid=ImgRaw&r=0",
	},
	{
		id: 2,
		name: "Andrew Solo",
		username: "andrew",
		profileImage:
			"https://th.bing.com/th/id/OIP.OpWUMJ36d4CdcNBz7VWrIQHaEK?rs=1&pid=ImgDetMain",
	},
];

interface IFriendsPage {
	page: string
}

export function FriendsPage(props: IFriendsPage) {
	// const { friends, isLoading, getAllFriends } = useFriends();
	// const { user } = useUserContext()

	// useEffect(() => {
	// 	if (user) {
	// 		getAllFriends(user?.username);
	// 	}
	// }, []);

	// if (isLoading) {
	// 	return (
	// 		<View>
	// 			<Text>Loading...</Text>
	// 		</View>
	// 	);
	// }

	if (props.page == "all"){
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					// refreshing={isLoading}
					data={friends}
					renderItem={({ item }) => (
						<FriendCard
							id={item.id}
							variant="friend"
							username={item.username}
							name={item.name}
							profileImage={item.profileImage}
						/>
					)}
				/>
			</View>
		);
	}
	if (props.page == "requests"){
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					// refreshing={isLoading}
					data={friends}
					renderItem={({ item }) => (
						<FriendCard
							id={item.id}
							variant="request"
							username={item.username}
							name={item.name}
							profileImage={item.profileImage}
						/>
					)}
				/>
			</View>
		);
	}
	if (props.page == "recommend"){
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					// refreshing={isLoading}
					data={friends}
					renderItem={({ item }) => (
						<FriendCard
							id={item.id}
							variant="notFriend"
							username={item.username}
							name={item.name}
							profileImage={item.profileImage}
						/>
					)}
				/>
			</View>
		);
	}
}
