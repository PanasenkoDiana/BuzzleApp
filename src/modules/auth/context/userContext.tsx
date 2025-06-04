import { createContext, useContext, ReactNode, useState } from "react";
import { useEffect } from "react";
import { IUser } from "../types";
import { IChangeUserPartOne, IChangeUserPartTwo, IError, IUser, Result } from "../types";
import { authUser } from "../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Result } from "../../../shared/types/result";
import { ISecondRegisterForm } from "../ui/second-register-modal/modal.types";

interface IUserContext {
	user: IUser | null;
	login: (email: string, password: string) => Promise<Result<string>>;
	register: (email: string, username: string, password: string) => Promise<Result<string> | undefined>;
	isAuthenticated: () => boolean;
	setUser: (user: IUser | null) => void;
	verify: (email: string, code: string) => Promise<Result<string> | undefined>;
	changeUserPartOne: (data: IChangeUserPartOne, id: number) => Promise<Result<IUser>>
	changeUserPartTwo: (data: IChangeUserPartTwo, id: number) => Promise<Result<IUser>>
	addSecondUserInfo: (data: ISecondRegisterForm, id: number) => Promise<Result<IUser>>

}

const initialValue: IUserContext = {
	user: null,
	login: async (email: string, password: string) => {
		return { status: 'error', message: 'Not implemented' };
	},
	register: async (email: string, username: string, password: string) => {
		return { status: 'error', message: 'Not implemented' };
	},
	isAuthenticated: () => false,
	setUser: function (user: IUser | null): void {
		throw new Error("Function not implemented.");
	},
	verify: async (email: string, code: string) => {
		return { status: 'error', message: 'Not implemented' };
	},
	changeUserPartOne: async (data:IChangeUserPartOne, id: number) => {
		return { status: 'error', message: 'Not implemented' };
	},
	changeUserPartTwo: async (data:IChangeUserPartTwo, id: number) => {
		return { status: 'error', message: 'Not implemented' };
	},
	addSecondUserInfo: async (data:ISecondRegisterForm, id: number) => {
		return { status: 'error', message: 'Not implemented' };
	},
};

const userContext = createContext<IUserContext>(initialValue);

export function useUserContext() {
	return useContext(userContext);
}

interface IUserContextProviderProps {
	children?: ReactNode;
}

export function UserContextProvider(props: IUserContextProviderProps) {
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		const fetchTokenAndUserData = async () => {
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				return;
			}
			const response = await authUser.getData(token);

			if (!response) return;
			
			if (response.status === "success") {
                setUser(response.data);
            } else {
                console.log("Ошибка:", response.message);
			}
		};

		fetchTokenAndUserData();
	}, []);

	function isAuthenticated() {
		if (user === null) {
			return false;
		}
		return true;
	}

	return (
		<userContext.Provider
			value={{
				user: user,
				login: authUser.login,
				register: authUser.register,
				isAuthenticated: isAuthenticated,
                setUser: setUser,
				verify: authUser.verifyUser,
				changeUserPartOne: authUser.changeUserPartOne,
				changeUserPartTwo: authUser.changeUserPartTwo,
				addSecondUserInfo: authUser.addSecondUserInfo,
			}}
		>
			{props.children}
		</userContext.Provider>
	);
}
