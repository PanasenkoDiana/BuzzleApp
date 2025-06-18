import { useState } from "react"
import { SERVER_HOST } from "../../../shared/constants";
import { Result } from "../../../shared/types/result";
import { useUserContext } from "../../auth/context/userContext";




export function useDeleteAlbumPhoto() {
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)


    async function DeleteAlbumPhoto(id: number){
        try {
            setIsLoading(true);
            const response = await fetch(`${SERVER_HOST}api/albums/delete`, {
                method: "DELETE",
                headers: {
                    'Content-Type':'application/json',
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
                return result.data
            }

        } catch (error) {
            return { status: "error", message: "An unexpected error occurred" };
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, error, deleteFunction: DeleteAlbumPhoto }
}