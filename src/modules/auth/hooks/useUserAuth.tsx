import  AsyncStorage from '@react-native-async-storage/async-storage';
import { Response, IUser } from "../types"



export const authUser = {
    
    getData: async function(token: string){
        try{
            const response = await fetch('http://192.168.3.4:8000/api/user/me', {
                headers: {'Authorization': `Bearer ${token}`}
            })
            const result: Response<IUser> = await response.json()
            if (result.status === 'error'){
                console.log(result.message) 
                return
            }
            return result.data
        } catch(error){
    
        }
    },

    
    login: async function(email: string, password: string){
        try{
            const response = await fetch('http://192.168.3.4:8000/api/user/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'email': email, 'password': password})
            })
            const result: Response<string> = await response.json()
            if (result.status === 'error'){
                console.log(result.message)
                return result
            }
            authUser.getData(result.data)
            AsyncStorage.setItem('token', result.data)
            return result
        } catch(error){
    
        }
    },
    
    register: async function(email: string, username: string, password: string ){
        try {
            const response = await fetch('http://192.168.3.4:8000/api/user/register', { 
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

