import { useState } from "react";
import { Result } from "../../../shared/types/result";
import { IFriend } from "../types/friend";
import { SERVER_HOST } from "../../../shared/constants";

export function useFriends() {
	const [friends, setFriends] = useState<IFriend[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function getAllFriends(username: string): Promise<Result<IFriend[]>>  {
		try {
            setIsLoading(true)
			const response = await fetch(`${SERVER_HOST}api/friends/${username}`);
			const result: Result<IFriend[]> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log(result.message);
				return result
			}

			setFriends(result.data);
            setIsLoading(false)
			return result
		} catch (err) {
			console.log(err);
			throw err
		}
	}

	async function deleteFriend(friendUsername: string, username: string): Promise<Result<string>> {
		try {
			const response = await fetch(`${SERVER_HOST}api/posts/delete`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({friendUsername, username}),
			});

			const result: Result<string> = await response.json();

			return result
		} catch (err) {
			console.log(err);
			throw err
		}
	}

	async function sendFriendRequest(friendUsername: string, username: string) {
		try {
			const response = await fetch(`${SERVER_HOST}api/posts/send`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({friendUsername, username}),
			});

			const result: Result<string> = await response.json();

			return result
		} catch (err) {
			console.log(err);
			throw err
		}
	}

	async function cancelFriendRequest(friendUsername: string, username: string) {
		try {
			const response = await fetch(`${SERVER_HOST}api/posts/dismiss`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({friendUsername, username}),
			});

			const result: Result<string> = await response.json();

			return result
		} catch (err) {
			console.log(err);
			throw err
		}
	}

	async function acceptFriendRequest(friendUsername: string, username: string) {
		try {
			const response = await fetch(`${SERVER_HOST}api/posts/dismiss`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({friendUsername, username}),
			});

			const result: Result<string> = await response.json();

			return result
		} catch (err) {
			console.log(err);
			throw err
		}
	}

    return {
        friends,
        isLoading,
        error,
        getAllFriends,
		deleteFriend,
		sendFriendRequest,
		cancelFriendRequest,
		acceptFriendRequest
    }
}
