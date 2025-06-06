import { useState } from "react";
import { Result } from "../../../shared/types/result";
import { IUser, IRequest, IMyRequest } from "../types/friend";
import { SERVER_HOST } from "../../../shared/constants";

export function useFriends() {
	const [friends, setFriends] = useState<IUser[]>([]);
	const [requests, setRequests] = useState<IUser[]>([]);
	const [myRequests, setMyRequests] = useState<IUser[]>([]);
	const [recommends, setRecommends] = useState<IUser[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function getAllFriends() {
		console.log("getAllFriends called");
		try {
			setIsLoading(true);
			const response = await fetch(`${SERVER_HOST}api/friends`);
			const result: Result<IUser[]> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log("getAllFriends error:", result.message);
				return;
			}

			console.log("getAllFriends success:", result.data);
		} catch (err) {
			console.log("getAllFriends exception:", err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}

	async function getRecommends() {
		console.log("getRecommends called");
		try {
			setIsLoading(true);
			const response = await fetch(
				`${SERVER_HOST}api/friends/recommends`
			);
			
			const result: Result<IUser[]> = await response.json();
			if (result.status === "error") {
				setError(result.message);
				console.log(result.message);
				return;
			}

			setRecommends(result.data);
		} catch (err) {
			console.log(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}

	async function getRequests() {
		console.log("getRequests called");
		try {
			setIsLoading(true);
			const response = await fetch(`${SERVER_HOST}api/friends/requests`);

			const result: Result<IUser[]> = await response.json();
			if (result.status === "error") {
				setError(result.message);
				return;
			}
			setRequests(result.data);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async function getMyRequests() {
		console.log("getMyRequests called");
		try {
			setIsLoading(true);
			const response = await fetch(
				`${SERVER_HOST}api/friends/myRequests`
			);

			const result: Result<IUser[]> = await response.json();
			if (result.status === "error") {
				setError(result.message);
				return;
			}
			setMyRequests(result.data);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async function sendRequest(friendUsername: string, username: string) {
		console.log("sendRequest called");
		try {
			const response = await fetch(`${SERVER_HOST}api/friends/send`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ friendUsername, username }),
			});

			const result: Result<string> = await response.json();
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	
	async function deleteFriend(
		friendUsername: string,
		username: string
	) {
		console.log("deleteFriend called");
		try {
			const response = await fetch(`${SERVER_HOST}api/friends/delete`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ friendUsername, username }),
			});

			const result: Result<string> = await response.json();
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async function acceptRequest(friendUsername: string, username: string) {
		console.log("acceptRequest called");
		try {
			const response = await fetch(`${SERVER_HOST}api/friends/accept`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ friendUsername, username }),
			});

			const result: Result<string> = await response.json();
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async function cancelRequest(friendUsername: string, username: string) {
		console.log("cancelRequest called");
		try {
			const response = await fetch(`${SERVER_HOST}api/friends/cancel`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ friendUsername, username }),
			});

			const result: Result<string> = await response.json();
			return result;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async function cancelMyRequest(username: string, friendUsername: string) {
		console.log("cancelMyRequest called");
		try {
			const response = await fetch(`${SERVER_HOST}api/friends/cancel`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, friendUsername }),
			});

			const result: Result<string> = await response.json();
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
		error,
		getAllFriends,
		deleteFriend,
		sendRequest,
		cancelRequest,
		cancelMyRequest,
		acceptRequest,
		getRequests,
		getMyRequests,
		getRecommends,
	};
}
