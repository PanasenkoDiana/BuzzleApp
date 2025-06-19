import { useState, useEffect } from "react"
import { IMyPhotosList } from "../types"
import { SERVER_HOST } from "../../../shared/constants"
import { Result } from "../../../shared/types/result"
import { useUserContext } from "../../auth/context/userContext"
import { ICreateAlbumModalForm } from "../entities/ui/create-album-modal/modal.types"

export function useCreateAlbum(){
    const [ myPhotos, setMyPhotos ] = useState<IMyPhotosList | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)
    const { getToken } = useUserContext()


    async function CreateAlbumPhoto(data: ICreateAlbumModalForm){
        try {
			setIsLoading(true);
            const token = await getToken()
            const response = await fetch(`${SERVER_HOST}api/albums/create`, {
                method: "POST",
                headers: {'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    topic: data.topic,
                    createdAt: data.createdAt,
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


    return { myPhotos, isLoading, error, refetch: CreateAlbumPhoto }
}