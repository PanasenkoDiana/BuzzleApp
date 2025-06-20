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
  login: (email: string, password: string) => Promise<Result<string>>;
  register: (email: string, password: string) => Promise<Result<string>>;
  isAuthenticated: () => boolean;
  setUser: (user: IUser | null) => void;
  getToken: () => Promise<string | null>;
  verify: (email: string, code: string) => Promise<Result<string>>;
  fetchUser: () => Promise<void>;
  changeUserPartOne: (
    data: IChangeUserPartOne,
  ) => Promise<Result<IUser>>;
  changeUserPartTwo: (
    data: IChangeUserPartTwo,
  ) => Promise<Result<IUser>>;
  addSecondUserInfo: (
    data: ISecondRegisterForm,
    id: number
  ) => Promise<Result<IUser>>;
}

const initialValue: IUserContext = {
  user: null,
  login: async () => ({ status: "error", message: "Not implemented" }),
  register: async () => ({ status: "error", message: "Not implemented" }),
  isAuthenticated: () => false,
  setUser: () => {},
  getToken: async () => null,
  verify: async () => ({ status: "error", message: "Not implemented" }),
  fetchUser: async () => {},
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
  })
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
    fetchUser();
  }, []);

  async function fetchUser() {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const response = await getData(token);
    if (response.status === "success") {
      setUser(response.data);
    } else {
      console.log("Ошибка при загрузке пользователя:", response.message);
      setUser(null);
      await AsyncStorage.removeItem("token");
    }
  };


  function isAuthenticated() {
    return user !== null;
  }

  async function getToken(): Promise<string | null> {
    return await AsyncStorage.getItem("token");
  }

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
        fetchUser
      }}
    >
      {children}
    </userContext.Provider>
  );
}
