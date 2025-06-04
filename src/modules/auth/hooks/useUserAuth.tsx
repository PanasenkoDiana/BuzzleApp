import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	Result,
	IUser,
	IError,
	IChangeUserPartOne,
	IChangeUserPartTwo,
} from "../types";
import { ISecondRegisterForm } from "../ui/second-register-modal/modal.types";
import { SERVER_HOST } from "../../../shared/constants";

export const authUser = {
	getData: async (token: string): Promise<Result<IUser> | undefined> => {
		try {
			const response = await fetch(`${SERVER_HOST}api/user/me`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const result: Result<IUser> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
			}
			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	},

	login: async (email: string, password: string): Promise<Result<string>> => {
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
			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	},

	register: async (
		email: string,
		username: string,
		password: string
	): Promise<Result<string>> => {
		try {
			const response = await fetch(`${SERVER_HOST}api/user/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, username, password }),
			});

			const result: Result<string> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
			}

			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	},

	verifyUser: async (
		email: string,
		code: string
	): Promise<Result<string>> => {
		try {
			const response = await fetch(`${SERVER_HOST}api/user/verify`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, code }),
			});

			const result: Result<string> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
			}
			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	},

	addSecondUserInfo: async (
		data: ISecondRegisterForm,
		id: number
	): Promise<Result<IUser>> => {
		try {
			const response = await fetch(`${SERVER_HOST}api/user/register/second/${id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result: Result<IUser> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
			}

			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	},

	changeUserPartOne: async (
		data: IChangeUserPartOne,
		id: number
	): Promise<Result<IUser>> => {
		try {
			const response = await fetch(`${SERVER_HOST}api/user/change/part-one/${id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result: Result<IUser> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
			}

			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	},

	changeUserPartTwo: async (
		data: IChangeUserPartTwo,
		id: number
	): Promise<Result<IUser>> => {
		try {
			const response = await fetch(`${SERVER_HOST}api/user/change/part-two/${id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result: Result<IUser> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
			}

			return result;
		} catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
	},
};
