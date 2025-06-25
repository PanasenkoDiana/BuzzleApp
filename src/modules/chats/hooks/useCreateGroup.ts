import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_HOST } from "../../../shared/constants";
import { IGroupForm } from "../entities/create-group-chat-modal/modal.types";

export function useCreateGroup() {
	async function createGroup(data: IGroupForm) {
		try {
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(
				`${SERVER_HOST}api/chats/create-group`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(data),
				}
			);
            return response
		} catch (err) {
			console.log(err);
		}
	}

	return { createGroup };
}
