import { useState, useEffect } from "react"
import { IMyPhotosList } from "../types"
import { SERVER_HOST } from "../../../shared/constants"
import { Result } from "../../../shared/types/result"
import { useUserContext } from "../../auth/context/userContext"

export function useDeleteMyPhoto(){
    // const [ myPhotos, setMyPhotos ] = useState<string | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)
    // const { getToken } =  useUserContext()
    const { fetchUser } = useUserContext();


    async function DeletePhoto(id: number){
        try {
            setIsLoading(true);
            // const token = await getToken()
            const response = await fetch(`${SERVER_HOST}api/user/photo/delete`, {
                method: "DELETE",
                headers: {'Content-Type':'application/json',
                    // Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id
                })
            })
            const result: Result<string> = await response.json();
            if (result.status === "error") {
                console.log(result.message);
                setError(result.message)
            } else {
                fetchUser()
                return result.data
            }

        } catch (error) {
            return { status: "error", message: "An unexpected error occurred" };
        } finally {
            setIsLoading(false)
        }
    }


    return { isLoading, error, deleteFunction: DeletePhoto }
}