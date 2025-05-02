import  AsyncStorage from '@react-native-async-storage/async-storage';
import { Response, IUser } from "../types"
import { useState } from 'react';

export const [user, setUser] = useState<IUser | null>(null)

export const authUser = {
    getData: async function(token: string){
        try{
            const response = await fetch('http://localhost:8000/api/user/me', {
                headers: {'Authorization': `Bearer ${token}`}
            })
            const result: Response<IUser> = await response.json()
            if (result.status === 'error'){
                console.log(result.message) 
                return
            }
            setUser(result.data)
        } catch(error){
    
        }
    },
    
    login: async function(email: string, password: string){
        try{
            const response = await fetch('http://localhost:8000/api/user/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'password': password})
            })
            const result: Response<string> = await response.json()
            if (result.status === 'error'){
                console.log(result.message)
                return
            }
            authUser.getData(result.data)
            AsyncStorage.setItem('token', result.data)
        } catch(error){
    
        }
    },
    
    register: async function(email: string, username: string, password: string ){
        try {
            const response = await fetch('http://localhost:8000/api/user/register', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'username': username, 'password': password})
            })
    
            const result: Response<string> = await response.json();
            if (result.status === 'error'){
                console.log(result.message);
                return;
            }
            authUser.getData(result.data)
            AsyncStorage.setItem('token', result.data)
    
        } catch(error){
    
        }
    }
}

