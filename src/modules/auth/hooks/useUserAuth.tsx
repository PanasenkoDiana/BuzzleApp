import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser, IChangeUserPartOne, IChangeUserPartTwo } from "../types";
import { ISecondRegisterForm } from "../ui/second-register-modal/modal.types";
import { SERVER_HOST } from "../../../shared/constants";
import { Result } from "../../../shared/types/result";

export function authUser(setUser: (user: IUser | null) => void) {
	async function getData(token: string): Promise<Result<IUser> | undefined> {
		try {
			console.log(1)
			const response = await fetch(`${SERVER_HOST}api/user/me`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log(2)

			const result: Result<IUser> = await response.json();
			console.log(3)

			if (result.status === "error") {
				console.log(result.message);
				return result;
			}
			console.log(4)

			setUser(result.data);
			console.log(5)

			return result;
		} catch (error) {
			console.error("Ошибка в getData:", error);
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function login(
		email: string,
		password: string
	): Promise<Result<string>> {
		try {
			const response = await fetch(`${SERVER_HOST}api/user/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const result: Result<string> = await response.json();

			if (result.status === "error") {
				console.log(result.message);
				return result;
			}

			await AsyncStorage.setItem("token", result.data);
			await getData(result.data);

			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function register(
		email: string,
		username: string,
		password: string
	): Promise<Result<string>> {
		try {
			const response = await fetch(`${SERVER_HOST}api/user/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, username, password }),
			});

			const result: Result<string> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}

			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function verifyUser(
		email: string,
		code: string
	): Promise<Result<string>> {
		try {
			const response = await fetch(`${SERVER_HOST}api/user/verify`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, code }),
			});

			const result: Result<string> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}

			await AsyncStorage.setItem("token", result.data);
			await getData(result.data);

			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function addSecondUserInfo(
		data: ISecondRegisterForm,
		id: number
	): Promise<Result<IUser>> {
		try {
			const response = await fetch(
				`${SERVER_HOST}api/user/register/second/${id}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);

			const result: Result<IUser> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}

			setUser(result.data);
			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function changeUserPartOne(
		data: IChangeUserPartOne,
		id: number
	): Promise<Result<IUser>> {
		try {
			const response = await fetch(
				`${SERVER_HOST}api/user/change/part-one/${id}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);

			const result: Result<IUser> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}

			setUser(result.data);
			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function changeUserPartTwo(
		data: IChangeUserPartTwo,
		id: number
	): Promise<Result<IUser>> {
		try {
			const response = await fetch(
				`${SERVER_HOST}api/user/change/part-two/${id}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);

			const result: Result<IUser> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}

			setUser(result.data);
			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	return {
		getData,
		login,
		register,
		verifyUser,
		addSecondUserInfo,
		changeUserPartOne,
		changeUserPartTwo,
	};
}
