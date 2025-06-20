import { useState } from "react";
import { Result } from "../../../shared/types/result";
import {
	IRequest,
	IMyRequest,
	IFriendRequest,
	ICanceledRequest,
	IDeletedRequest
} from "../types/types";
import { IUser } from "../../auth/types";
import { SERVER_HOST } from "../../../shared/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFriends() {
	const [friends, setFriends] = useState<IUser[]>([]);
	const [requests, setRequests] = useState<IRequest[]>([]);
	const [myRequests, setMyRequests] = useState<IMyRequest[]>([]);
	const [recommends, setRecommends] = useState<IUser[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	async function getAllFriends() {
		console.log("getAllFriends called");
		try {
			setIsLoading(true);
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/friends/`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result: Result<IUser[]> = await response.json();
			if (result.status === "error") {
				console.log("getAllFriends error:", result.message);
				return;
			}

			console.log(result.data);
			setFriends(result.data);
		} catch (err) {
			console.log("getAllFriends exception:", err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}

	async function getRequests() {
		console.log("getRequests called");
		try {
			setIsLoading(true);
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/friends/requests`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result: Result<IRequest[]> = await response.json();
			if (result.status === "error") {
				console.log("getRequests error:", result.message);
				return;
			}

			console.log(result);
			setRequests(result.data);
		} catch (err) {
			console.log(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}

	async function getMyRequests() {
		console.log("getMyRequests called");
		try {
			setIsLoading(true);
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(
				`${SERVER_HOST}api/friends/myRequests`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const result: Result<IMyRequest[]> = await response.json();
			if (result.status === "error") {
				console.log("getMyRequests error:", result.message);
				return;
			}

			console.log(result);
			setMyRequests(result.data);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}

	async function getRecommends() {
		console.log("getRecommends called");
		try {
			setIsLoading(true);

			const token = await AsyncStorage.getItem("token");
			const response = await fetch(
				`${SERVER_HOST}api/friends/recommends`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const result: Result<IUser[]> = await response.json();
			if (result.status === "error") {
				console.log("getRecommends error:", result.message);
				return;
			}

			console.log(result);
			setRecommends(result.data);
		} catch (err) {
			console.log(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}

	async function sendRequest(friendUsername: string) {
		console.log("sendRequest called");
		try {
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/friends/send`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ username: friendUsername }),
			});

			const result: Result<IFriendRequest> = await response.json();
			if (result.status === "success") await getRecommends();

			console.log(result);
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async function acceptRequest(friendUsername: string) {
		console.log("acceptRequest called");
		try {
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/friends/accept`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ username: friendUsername }),
			});

			const result: Result<IFriendRequest> = await response.json();
			if (result.status === "success") await getRequests();

			console.log(result);
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async function cancelRequest(username: string, isIncoming: boolean) {
		console.log("cancelRequest called");
		try {
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/friends/cancel`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ username, isIncoming }),
			});

			const result: Result<ICanceledRequest> = await response.json();
			if (result.status === "success") {
				await getRequests();
				await getMyRequests();
			}

			console.log(result);
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async function deleteFriend(username: string) {
		console.log("deleteFriend called");
		try {
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/friends/delete`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ username }),
			});

			const result: Result<IDeletedRequest> = await response.json();
			if (result.status === "success") {
				await getAllFriends();
			}

			console.log(result);
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	return {
		friends,
		requests,
		myRequests,
		recommends,
		isLoading,
		getAllFriends,
		sendRequest,
		cancelRequest,
		acceptRequest,
		getRequests,
		getMyRequests,
		getRecommends,
		deleteFriend
	};
}
