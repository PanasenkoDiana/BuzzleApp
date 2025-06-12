import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from "react";
import { IChangeUserPartOne, IChangeUserPartTwo, IUser } from "../types";
import { authUser } from "../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISecondRegisterForm } from "../ui/second-register-modal/modal.types";
import { Result } from "../../../shared/types/result";

interface IUserContext {
	user: IUser | null;
	// token: string | null
	login: (email: string, password: string) => Promise<Result<string>>;
	register: (
		email: string,
		username: string,
		password: string
	) => Promise<Result<string> | undefined>;
	isAuthenticated: () => boolean;
	setUser: (user: IUser | null) => void;
	// setToken: (token: string | null) => void;
	getToken: () => void
	verify: (
		email: string,
		code: string
	) => Promise<Result<string> | undefined>;
	changeUserPartOne: (
		data: IChangeUserPartOne,
		id: number
	) => Promise<Result<IUser>>;
	changeUserPartTwo: (
		data: IChangeUserPartTwo,
		id: number
	) => Promise<Result<IUser>>;
	addSecondUserInfo: (
		data: ISecondRegisterForm,
		id: number
	) => Promise<Result<IUser>>;
}

const initialValue: IUserContext = {
	user: null,
	// token: null,
	login: async () => ({ status: "error", message: "Not implemented" }),
	register: async () => ({ status: "error", message: "Not implemented" }),
	isAuthenticated: () => false,
	setUser: () => {},
	// setToken: () => {},
	getToken: async () => ({ status: "error", message: "Not implemented" }),
	verify: async () => ({ status: "error", message: "Not implemented" }),
	changeUserPartOne: async () => ({
		status: "error",
		message: "Not implemented",
	}),
	changeUserPartTwo: async () => ({
		status: "error",
		message: "Not implemented",
	}),
	addSecondUserInfo: async () => ({
		status: "error",
		message: "Not implemented",
	}),
};

const userContext = createContext<IUserContext>(initialValue);

export function useUserContext() {
	return useContext(userContext);
}

interface IUserContextProviderProps {
	children?: ReactNode;
}

export function UserContextProvider({ children }: IUserContextProviderProps) {
	const [user, setUser] = useState<IUser | null>(null);
	// const [token, setToken] = useState<string | null>(null)
	const {
		getData,
		login,
		register,
		verifyUser,
		changeUserPartOne,
		changeUserPartTwo,
		addSecondUserInfo,
	} = authUser(setUser);

	useEffect(() => {
		const fetchUser = async () => {
			const token = await AsyncStorage.getItem("token");
			if (!token) return;


			// setToken(token)

			const response = await getData(token);
			if (response?.status === "success") {
				setUser(response.data);
			} else {
				console.log(
					"Ошибка при загрузке пользователя:",
					response?.message
				);
			}
		};

		fetchUser();
	}, []);

	function isAuthenticated() {
		return user !== null;
	}

	async function getToken() {
		const token = await AsyncStorage.getItem("token")

		if (!token) return

		return token
	}

	// useEffect(()=>{
	// 	const setNewToken = async () => {
	// 		if (!token) return
	// 		const newToken = await AsyncStorage.setItem("token", token);

	// 	}

	// 	setNewToken()
	// },[token])

	return (
		<userContext.Provider
			value={{
				user,
				login,
				register,
				isAuthenticated,
				setUser,
				getToken,
				verify: verifyUser,
				changeUserPartOne,
				changeUserPartTwo,
				addSecondUserInfo,
			}}
		>
			{children}
		</userContext.Provider>
	);
}
