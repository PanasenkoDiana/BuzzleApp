import AsyncStorage from "@react-native-async-storage/async-storage";
import { Result, IUser, IError } from "../types";

export const authUser = {
	getData: async function (
		token: string
	): Promise<Result<IUser> | undefined> {
		try {
			const response = await fetch(
				"http://192.168.3.4:8000/api/user/me",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const result: Result<IUser> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}
			return result;
		} catch (error) {}
	},

	login: async function (
		email: string,
		password: string
	): Promise<Result<string>> {
		try {
			const response = await fetch(
				"http://192.168.3.4:8000/api/user/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email, password: password }),
				}
			);

			const result: Result<string> = await response.json();

			if (result.status === "error") {
				console.log(result.message);
				return result;
			}

			await authUser.getData(result.data);
			await AsyncStorage.setItem("token", result.data);

			return { status: "success", data: result.data };
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	},

	register: async function (
		email: string,
		username: string,
		password: string
	): Promise<IError | undefined> {
		try {
			const response = await fetch(
				"http://192.168.3.4:8000/api/user/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: email,
						username: username,
						password: password,
					}),
				}
			);

			const result: Result<string> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}
			authUser.getData(result.data);
			AsyncStorage.setItem("token", result.data);
		} catch (error) {}
	},
};
