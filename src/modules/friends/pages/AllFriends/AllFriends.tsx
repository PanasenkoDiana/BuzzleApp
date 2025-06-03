import { FlatList, View, Text } from "react-native";
import { useFriends } from "../../hooks/useFriends";
import { useEffect } from "react";
import { FriendCard } from "../../entities/ui/FriendCard/friendcard";

const friends = [
	{
		name: "Oleg Gleborg",
		profileImage:
			"https://th.bing.com/th/id/R.8787e55692cf5f7bae1973ea4d7d3432?rik=%2bsAsOdzYp7LJFA&riu=http%3a%2f%2fcoolsen.ru%2fwp-content%2fuploads%2f2021%2f11%2f79-20211129_204332.jpg&ehk=%2b6O%2f0OTZH0r69lIYcGzL1MzK5CAkHsedTHFfFu8l8pc%3d&risl=&pid=ImgRaw&r=0",
	},
	{
		name: "Andrew Solo",
		profileImage:
			"https://th.bing.com/th/id/OIP.OpWUMJ36d4CdcNBz7VWrIQHaEK?rs=1&pid=ImgDetMain",
	},
];

export function Friends() {
	const { friends, isLoading, getAllFriends } = useFriends();

	useEffect(() => {
		getAllFriends();
	}, []);

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View>
			<FlatList
				refreshing={isLoading}
				data={friends}
				renderItem={({ item }) => (
					<FriendCard
						id={item.id}
						username={item.username}
						name={item.name}
						profileImage={item.profileImage}
					/>
				)}
			/>
		</View>
	);
}
