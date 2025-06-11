import { useState, useEffect } from "react"
import { IMyPhotosList } from "../types"
import { SERVER_HOST } from "../../../shared/constants"
import { Result } from "../../../shared/types/result"

export function useAddMyPhotos(userId: number, image: string){
    const [ myPhotos, setMyPhotos ] = useState<IMyPhotosList | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)


    async function AddPhoto(){
        try {
			setIsLoading(true);
            const response = await fetch(`${SERVER_HOST}api/user/photo/create`, {
                method: "POST",
                headers: {'Content-Type':'applications/json'},
                body: JSON.stringify({
                    id: userId,
                    image: image
                })
            })
            const result: Result<IMyPhotosList> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				setError(result.message)
			} else {
                return result.data
				// setMyPhotos(result.data)
			}

        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		} finally {
			setIsLoading(false)
		}
    }


    return { myPhotos, isLoading, error, refetch: AddPhoto }
}