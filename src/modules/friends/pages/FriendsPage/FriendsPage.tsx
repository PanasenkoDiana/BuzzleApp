import {
	FlatList,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useFriends } from "../../hooks/useFriends";
import { useEffect } from "react";
import { FriendCard } from "../../entities/ui/FriendCard/FriendCard";
import { styles } from "./FriendsPage.styles";

interface IFriendsPage {
	selectedPage: string;
	setSelectedPage: (page: string) => void;
}

// const requests = [
// 	{
// 		id: 17,
// 		email: "john@example.com",
// 		username: "john123",
// 		name: "John",
// 		surname: "Doe",
// 		profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
// 	},
// 	{
// 		id: 18,
// 		email: "jane@example.com",
// 		username: "jane_d",
// 		name: "Jane",
// 		surname: "Doe",
// 		profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
// 	},
// 	{
// 		id: 19,
// 		email: "mike@example.com",
// 		username: "mike_m",
// 		name: "Mike",
// 		surname: "Miller",
// 		profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
// 	},
// 	{
// 		id: 20,
// 		email: "sara@example.com",
// 		username: "sara_s",
// 		name: "Sara",
// 		surname: "Smith",
// 		profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
// 	},
// ];

// const recommends = [
// 	{
// 		id: 1,
// 		email: "alice@example.com",
// 		username: "alice_w",
// 		name: "Alice",
// 		surname: "Walker",
// 		profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
// 	},
// 	{
// 		id: 2,
// 		email: "bob@example.com",
// 		username: "bob_t",
// 		name: "Bob",
// 		surname: "Taylor",
// 		profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
// 	},
// 	{
// 		id: 3,
// 		email: "carla@example.com",
// 		username: "carla_r",
// 		name: "Carla",
// 		surname: "Rodriguez",
// 		profileImage: "https://randomuser.me/api/portraits/women/7.jpg",
// 	},
// 	{
// 		id: 4,
// 		email: "dave@example.com",
// 		username: "dave_h",
// 		name: "Dave",
// 		surname: "Harris",
// 		profileImage: "https://randomuser.me/api/portraits/men/8.jpg",
// 	},
// 	{
// 		id: 5,
// 		email: "emma@example.com",
// 		username: "emma_s",
// 		name: "Emma",
// 		surname: "Scott",
// 		profileImage: "https://randomuser.me/api/portraits/women/9.jpg",
// 	},
// 	{
// 		id: 6,
// 		email: "frank@example.com",
// 		username: "frank_m",
// 		name: "Frank",
// 		surname: "Moore",
// 		profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
// 	},
// 	{
// 		id: 7,
// 		email: "grace@example.com",
// 		username: "grace_k",
// 		name: "Grace",
// 		surname: "King",
// 		profileImage: "https://randomuser.me/api/portraits/women/11.jpg",
// 	},
// 	{
// 		id: 8,
// 		email: "henry@example.com",
// 		username: "henry_l",
// 		name: "Henry",
// 		surname: "Lee",
// 		profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
// 	},
// ];

// const friends = [
// 	{
// 		id: 9,
// 		email: "irene@example.com",
// 		username: "irene_n",
// 		name: "Irene",
// 		surname: "Nelson",
// 		profileImage: "https://randomuser.me/api/portraits/women/13.jpg",
// 	},
// 	{
// 		id: 10,
// 		email: "jack@example.com",
// 		username: "jack_d",
// 		name: "Jack",
// 		surname: "Dixon",
// 		profileImage: "https://randomuser.me/api/portraits/men/14.jpg",
// 	},
// 	{
// 		id: 11,
// 		email: "karen@example.com",
// 		username: "karen_m",
// 		name: "Karen",
// 		surname: "Martin",
// 		profileImage: "https://randomuser.me/api/portraits/women/15.jpg",
// 	},
// 	{
// 		id: 12,
// 		email: "liam@example.com",
// 		username: "liam_b",
// 		name: "Liam",
// 		surname: "Baker",
// 		profileImage: "https://randomuser.me/api/portraits/men/16.jpg",
// 	},
// 	{
// 		id: 13,
// 		email: "mia@example.com",
// 		username: "mia_w",
// 		name: "Mia",
// 		surname: "White",
// 		profileImage: "https://randomuser.me/api/portraits/women/17.jpg",
// 	},
// 	{
// 		id: 14,
// 		email: "nathan@example.com",
// 		username: "nathan_c",
// 		name: "Nathan",
// 		surname: "Clark",
// 		profileImage: "https://randomuser.me/api/portraits/men/18.jpg",
// 	},
// 	{
// 		id: 15,
// 		email: "olivia@example.com",
// 		username: "olivia_t",
// 		name: "Olivia",
// 		surname: "Turner",
// 		profileImage: "https://randomuser.me/api/portraits/women/19.jpg",
// 	},
// 	{
// 		id: 16,
// 		email: "peter@example.com",
// 		username: "peter_h",
// 		name: "Peter",
// 		surname: "Hill",
// 		profileImage: "https://randomuser.me/api/portraits/men/20.jpg",
// 	},
// ];

export function FriendsPage(props: IFriendsPage) {
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

	useEffect(() => {
		if (selectedPage === "main") {
			getRequests();
			getRecommends();
			getAllFriends();
		}
		if (selectedPage === "requests") {
			getRequests();
		}
		if (selectedPage === "recommends") {
			getRecommends();
		}
		if (selectedPage === "all") {
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

	if (props.selectedPage == "main") {
		const usersRequests = requests.map((request) => {
			return request.from
		})
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.main}>
						{requests.length > 0 ? (
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
								<View style={styles.content}>
									<FlatList
										contentContainerStyle={styles.list}
										refreshing={isLoading}
										data={usersRequests}
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
							</View>
						) : (
							<></>
						)}
						{recommends.length > 0 ? (
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
								<View style={styles.content}>
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
							</View>
						) : (
							<></>
						)}

						{friends.length > 0 ? (
							<View style={styles.mainContainer}>
								<View style={styles.buttonContainer}>
									<Text style={styles.text}>Всі друзі</Text>
									<TouchableOpacity
										onPress={() =>
											setSelectedPage("friends")
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
								<View style={styles.content}>
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
							</View>
						) : (
							<></>
						)}
					</View>
				</ScrollView>
			</View>
		);
	}

	if (props.selectedPage == "requests") {
		const usersRequests = requests.map((request) => {
			return request.from
		})
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					refreshing={isLoading}
					data={usersRequests}
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

	if (props.selectedPage == "recommends") {
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

	if (props.selectedPage == "all") {
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
}
