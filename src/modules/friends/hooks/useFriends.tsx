import { useState } from "react";
import { Result } from "../../../shared/types/result";
import { IFriend } from "../types/friend";
import { SERVER_HOST } from "../../../shared/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFriends() {
	const [friends, setFriends] = useState<IFriend[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function getAllFriends(id: number) {
		try {
            setIsLoading(true)
			const response = await fetch(`${SERVER_HOST}api/friend/${id}`);
			const result: Result<IFriend[]> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log(result.message);
				return;
			}

			setFriends(result.data);
            setIsLoading(false)
		} catch (err) {
			console.log(err);
		}
	}

    return {
        friends,
        isLoading,
        error,
        getAllFriends
    }
}
