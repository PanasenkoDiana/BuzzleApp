import { useState, useEffect } from "react"
import { IAlbum, IMyPhotosList } from "../types"
import { SERVER_HOST } from "../../../shared/constants"
import { Result } from "../../../shared/types/result"
import { useUserContext } from "../../auth/context/userContext"

export function useAddAlbumPhoto(){
    const [ myPhotos, setMyPhotos ] = useState<IMyPhotosList | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)
	const { fetchUser } = useUserContext();

    async function AddAlbumPhoto(data: {image: string, id: number}){
        try {
            setIsLoading(true);
            const response = await fetch(`${SERVER_HOST}api/albums/add/${data.id}`, {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    image: data.image
                })
            })
            const result: Result<IMyPhotosList> = await response.json();
            if (result.status === "error") {
                console.log(result.message);
                setError(result.message)
            } else {
                fetchUser();
                return result.data
                // setMyPhotos(result.data)
            }
        } catch (error) {
            return { status: "error", message: "An unexpected error occurred" };
        } finally {
            setIsLoading(false)
        }
    }


    return { myPhotos, isLoading, error, refetch: AddAlbumPhoto }
}