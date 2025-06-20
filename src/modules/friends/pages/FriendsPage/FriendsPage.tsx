import {
	FlatList,
	View,
	Text,
	TouchableOpacity,
	RefreshControl,
	ScrollView,
} from "react-native";
import { useFriends } from "../../hooks/useFriends";
import { useEffect, useState } from "react";
import { FriendCard } from "../../entities/ui/FriendCard";
import { styles } from "./FriendsPage.styles";

interface IFriendsPage {
	selectedPage: string;
	setSelectedPage: (page: string) => void;
}

export function FriendsPage({ selectedPage, setSelectedPage }: IFriendsPage) {
	const [refresh, setRefresh] = useState(false);
	const {
		isLoading,
		friends,
		recommends,
		requests,
		getAllFriends,
		getRecommends,
		getRequests,
	} = useFriends();

	const onRefresh = async () => {
		setRefresh(true);
		await Promise.all([getRequests(), getRecommends(), getAllFriends()]);
		setRefresh(false);
	};

	useEffect(() => {
		if (selectedPage === "main") {
			getRequests();
			getRecommends();
			getAllFriends();
		} else if (selectedPage === "requests") {
			getRequests();
		} else if (selectedPage === "recommends") {
			getRecommends();
		} else if (selectedPage === "all") {
			getAllFriends();
		}
	}, [selectedPage]);

	if (isLoading) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	const renderFriendCard = (variant: "friend" | "request" | "notFriend") => ({
		item,
	}: {
		item: any;
	}) => (
		<FriendCard
			variant={variant}
			username={item.username}
			name={item.name}
			surname={item.surname}
			Profile={item.Profile}
		/>
	);

	if (selectedPage === "main") {
		const usersRequests = requests.map((r) => ({
			...r.from,
			variant: "request",
		}));

		return (
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
					}
				>
					<View style={styles.main}>
						{usersRequests.length > 0 && (
							<View style={styles.mainContainer}>
								<View style={styles.buttonContainer}>
									<Text style={styles.text}>Запити</Text>
									<TouchableOpacity
										onPress={() => setSelectedPage("requests")}
									>
										<Text style={[styles.text, styles.seeAllText]}>
											Дивитись всі
										</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.content}>
									{usersRequests.slice(0, 2).map((item) => (
										<FriendCard
											key={item.username}
											variant="request"
											username={item.username}
											name={item.name}
											surname={item.surname}
											Profile={item.Profile}
										/>
									))}
								</View>
							</View>
						)}

						{recommends.length > 0 && (
							<View style={styles.mainContainer}>
								<View style={styles.buttonContainer}>
									<Text style={styles.text}>Рекомендації</Text>
									<TouchableOpacity
										onPress={() => setSelectedPage("recommends")}
									>
										<Text style={[styles.text, styles.seeAllText]}>
											Дивитись всі
										</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.content}>
									{recommends.slice(0, 2).map((item) => (
										<FriendCard
											key={item.username}
											variant="notFriend"
											username={item.username}
											name={item.name}
											surname={item.surname}
											Profile={item.Profile}
										/>
									))}
								</View>
							</View>
						)}

						{friends.length > 0 && (
							<View style={styles.mainContainer}>
								<View style={styles.buttonContainer}>
									<Text style={styles.text}>Всі друзі</Text>
									<TouchableOpacity
										onPress={() => setSelectedPage("all")}
									>
										<Text style={[styles.text, styles.seeAllText]}>
											Дивитись всі
										</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.content}>
									{friends.slice(0, 2).map((item) => (
										<FriendCard
											key={item.username}
											variant="friend"
											username={item.username}
											name={item.name}
											surname={item.surname}
											Profile={item.Profile}
										/>
									))}
								</View>
							</View>
						)}
					</View>
				</ScrollView>
			</View>
		);
	}

	const getListData = () => {
		switch (selectedPage) {
			case "requests":
				return requests.map((r) => ({ ...r.from, variant: "request" }));
			case "recommends":
				return recommends.map((r) => ({ ...r, variant: "notFriend" }));
			case "all":
				return friends.map((f) => ({ ...f, variant: "friend" }));
			default:
				return [];
		}
	};

	if (["requests", "recommends", "all"].includes(selectedPage)) {
		const data = getListData();
		return (
			<View style={styles.container}>
				<FlatList
					refreshControl={
						<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
					}
					data={data}
					keyExtractor={(item) => item.username}
					contentContainerStyle={styles.list}
					renderItem={({ item }) => (
						<FriendCard
							variant={item.variant}
							username={item.username}
							name={item.name}
							surname={item.surname}
							Profile={item.Profile}
						/>
					)}
				/>
			</View>
		);
	}

	return null;
}
