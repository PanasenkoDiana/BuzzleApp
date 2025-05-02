import { createContext, useContext, ReactNode, useState } from "react"
import { useEffect } from "react"
import { IUser } from "../types"
import { authUser, user } from "../hooks"
import  AsyncStorage from '@react-native-async-storage/async-storage';

interface IUserContext{
    user: IUser | null
    login: (email: string, password: string) => void
    register: (email: string, username: string, image: string, password: string) => void
    isAuthenticated: () => boolean
}

const initialValue: IUserContext = {
    user: null,
    login: (email: string, password: string) => {},
    register: (email: string, username: string, image: string, password: string) => {},
    isAuthenticated: () => false,
}
const userContext = createContext<IUserContext>(initialValue)

export function useUserContext(){
    return useContext(userContext)
}

interface IUserContextProviderProps{
    children?: ReactNode
}

export function UserContextProvider(props: IUserContextProviderProps){

    useEffect(()=>{
        const token = AsyncStorage.getItem('token')
        if(!token){
            return
            
        }
        authUser.getData(token)
    },[])
    
    function isAuthenticated() {
        if (user === null) {
            return false
        }
        return true 
    }

    return <userContext.Provider
    value={{
        user: user,
        login: authUser.login,
        register: authUser.register,
        isAuthenticated: isAuthenticated
    }}>

    {props.children}
    </userContext.Provider> 
}