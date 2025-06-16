import {
	FlatList,
	View,
	Text,
	TouchableOpacity,
	RefreshControl,
} from "react-native";
import { useFriends } from "../../hooks/useFriends";
import { useEffect, useState } from "react";
import { FriendCard } from "../../entities/ui/FriendCard";
import { styles } from "./FriendsPage.styles";

interface IFriendsPage {
	selectedPage: string;
	setSelectedPage: (page: string) => void;
}

type FriendVariant = "friend" | "request" | "notFriend";

interface FriendCardData {
	variant: FriendVariant;
	username: string;
	name: string | null;
	surname: string | null;
	profileImage: string | null;
}

export function FriendsPage(props: IFriendsPage) {
	const [refresh, setRefresh] = useState(false);
	const { selectedPage, setSelectedPage } = props;

	const {
		isLoading,
		friends,
		recommends,
		requests,
		getAllFriends,
		getRecommends,
		getRequests,
	} = useFriends();

	const onRefresh = () => {
		setRefresh(true);
		getRequests();
		getRecommends();
		getAllFriends();
		setTimeout(() => setRefresh(false), 2000);
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

	if (selectedPage === "main") {
		const usersRequests = requests.map((r) => r.from);
		return (
			<View style={styles.container}>
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={refresh}
							onRefresh={onRefresh}
						/>
					}
					data={[]}
					ListHeaderComponent={
						<View style={styles.main}>
							{/* Запити */}
							{usersRequests.length > 0 && (
								<View style={styles.mainContainer}>
									<View style={styles.buttonContainer}>
										<Text style={styles.text}>Запити</Text>
										<TouchableOpacity
											onPress={() =>
												setSelectedPage("requests")
											}
										>
											<Text
												style={[
													styles.text,
													styles.seeAllText,
												]}
											>
												Дивитись всі
											</Text>
										</TouchableOpacity>
									</View>
									{usersRequests.slice(0, 2).map((item) => (
										<View
											key={item.username}
											style={styles.content}
										>
											<FriendCard
												variant="request"
												username={item.username}
												name={item.name}
												surname={item.surname}
												profileImage={item.profileImage}
											/>
										</View>
									))}
								</View>
							)}

							{recommends.length > 0 && (
								<View style={styles.mainContainer}>
									<View style={styles.buttonContainer}>
										<Text style={styles.text}>
											Рекомендації
										</Text>
										<TouchableOpacity
											onPress={() =>
												setSelectedPage("recommends")
											}
										>
											<Text
												style={[
													styles.text,
													styles.seeAllText,
												]}
											>
												Дивитись всі
											</Text>
										</TouchableOpacity>
									</View>
									{recommends.slice(0, 2).map((item) => (
										<View
											key={item.username}
											style={styles.content}
										>
											<FriendCard
												variant="notFriend"
												username={item.username}
												name={item.name}
												surname={item.surname}
												profileImage={item.profileImage}
											/>
										</View>
									))}
								</View>
							)}

							{friends.length > 0 && (
								<View style={styles.mainContainer}>
									<View style={styles.buttonContainer}>
										<Text style={styles.text}>
											Всі друзі
										</Text>
										<TouchableOpacity
											onPress={() =>
												setSelectedPage("all")
											}
										>
											<Text
												style={[
													styles.text,
													styles.seeAllText,
												]}
											>
												Дивитись всі
											</Text>
										</TouchableOpacity>
									</View>
									{friends.slice(0, 2).map((item) => (
										<View
											key={item.username}
											style={styles.content}
										>
											<FriendCard
												variant="friend"
												username={item.username}
												name={item.name}
												surname={item.surname}
												profileImage={item.profileImage}
											/>
										</View>
									))}
								</View>
							)}
						</View>
					}
					renderItem={null}
				/>
			</View>
		);
	}

	const getDataByPage = (): FriendCardData[] => {
		switch (selectedPage) {
			case "requests":
				return requests.map((r) => ({
					...r.from,
					variant: "request" as const,
				}));
			case "recommends":
				return recommends.map((r) => ({
					...r,
					variant: "notFriend" as const,
				}));
			case "all":
				return friends.map((f) => ({
					...f,
					variant: "friend" as const,
				}));
			default:
				return [];
		}
	};

	if (["requests", "recommends", "all"].includes(selectedPage)) {
		const listData = getDataByPage();
		return (
			<View style={styles.container}>
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={refresh}
							onRefresh={onRefresh}
						/>
					}
					data={listData}
					keyExtractor={(item, index) => item.username + index}
					contentContainerStyle={styles.list}
					renderItem={({ item }) => (
						<FriendCard
							variant={item.variant}
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

	return null;
}
