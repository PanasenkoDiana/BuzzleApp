import { FlatList, View, Text } from "react-native";
import { useFriends } from "../../hooks/useFriends";
import { useEffect } from "react";
import { FriendCard } from "../../entities/ui/FriendCard/FriendCard";
import { styles } from "./FriendsPage.styles";
import { useUserContext } from "../../../auth/context/userContext";

const friends = [
	{
		id: 1,
		name: "Oleg",
		surname: "Gleborg",
		username: "oleggleb",
		profileImage:
			"https://th.bing.com/th/id/R.8787e55692cf5f7bae1973ea4d7d3432?rik=%2bsAsOdzYp7LJFA&riu=http%3a%2f%2fcoolsen.ru%2fwp-content%2fuploads%2f2021%2f11%2f79-20211129_204332.jpg&ehk=%2b6O%2f0OTZH0r69lIYcGzL1MzK5CAkHsedTHFfFu8l8pc%3d&risl=&pid=ImgRaw&r=0",
	},
	{
		id: 2,
		name: "Andrew",
		surname: "Solo",
		username: "andrew",
		profileImage:
			"https://th.bing.com/th/id/OIP.OpWUMJ36d4CdcNBz7VWrIQHaEK?rs=1&pid=ImgDetMain",
	},
];

const recommends = [
	{
		id: 4,
		name: "Ivan",
		surname: "Solevek",
		username: "isolevek",
		profileImage:
			"https://th.bing.com/th/id/OIP.OpWUMJ36d4CdcNBz7VWrIQHaEK?rs=1&pid=ImgDetMain",
	},
];

const requests = [
	{
		id: 3,
		name: "Fil",
		surname: "Olessss",
		username: "filolesss",
		profileImage:
			"https://th.bing.com/th/id/R.8787e55692cf5f7bae1973ea4d7d3432?rik=%2bsAsOdzYp7LJFA&riu=http%3a%2f%2fcoolsen.ru%2fwp-content%2fuploads%2f2021%2f11%2f79-20211129_204332.jpg&ehk=%2b6O%2f0OTZH0r69lIYcGzL1MzK5CAkHsedTHFfFu8l8pc%3d&risl=&pid=ImgRaw&r=0",
	},
];

const myRequests = [
	{
		id: 5,
		name: "Ponel",
		surname: "Xande",
		username: "xandepon",
		profileImage:
			"https://th.bing.com/th/id/R.8787e55692cf5f7bae1973ea4d7d3432?rik=%2bsAsOdzYp7LJFA&riu=http%3a%2f%2fcoolsen.ru%2fwp-content%2fuploads%2f2021%2f11%2f79-20211129_204332.jpg&ehk=%2b6O%2f0OTZH0r69lIYcGzL1MzK5CAkHsedTHFfFu8l8pc%3d&risl=&pid=ImgRaw&r=0",
	},
];

interface IFriendsPage {
	page: string;
}

export function FriendsPage(props: IFriendsPage) {
	const { page } = props;
	const {
		isLoading,
		error,
		friends,
		recommends,
		requests,
		myRequests,
		getAllFriends,
		getRecommends,
		getRequests,
		getMyRequests,
	} = useFriends();

	useEffect(() => {
		if (page === "all") getAllFriends();
		if (page === "recommends") getRecommends();
		if (page === "requests") getRequests();
		if (page === "myRequests") getMyRequests();
	}, [page]);

	if (isLoading) {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (props.page == "all") {
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					refreshing={isLoading}
					data={friends}
					renderItem={({ item }) => (
						<FriendCard
							variant="friend"
							username={item.username}
							name={item.name}
							surname={item.surname}
							profileImage={item.profileImage}
						/>
					)}
				/>
			</View>
		);
	}

	if (props.page == "recommends") {
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					refreshing={isLoading}
					data={recommends}
					renderItem={({ item }) => (
						<FriendCard
							variant="notFriend"
							username={item.username}
							name={item.name}
							surname={item.surname}
							profileImage={item.profileImage}
						/>
					)}
				/>
			</View>
		);
	}
	
	if (props.page == "requests") {
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					refreshing={isLoading}
					data={requests}
					renderItem={({ item }) => (
						<FriendCard
							variant="request"
							username={item.username}
							name={item.name}
							surname={item.surname}
							profileImage={item.profileImage}
						/>
					)}
				/>
			</View>
		);
	}
	if (props.page == "myRequests") {
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					refreshing={isLoading}
					data={myRequests}
					renderItem={({ item }) => (
						<FriendCard
							variant="myRequest"
							username={item.username}
							name={item.name}
							surname={item.surname}
							profileImage={item.profileImage}
						/>
					)}
				/>
			</View>
		);
	}
}
