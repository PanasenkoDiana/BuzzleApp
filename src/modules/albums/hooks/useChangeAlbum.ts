import { useState, useEffect } from "react"
import { IAlbum, IMyPhotosList } from "../types"
import { SERVER_HOST } from "../../../shared/constants"
import { Result } from "../../../shared/types/result"
import { IUpdateAlbumModalForm } from "../entities/ui/create-album-modal/modal.types"





export function useChangeAlbum(){
    const [ myPhotos, setMyPhotos ] = useState<IMyPhotosList | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)


    async function ChangeAlbumPhoto(data: IUpdateAlbumModalForm){
        try {
            setIsLoading(true);
            const response = await fetch(`${SERVER_HOST}api/albums/change/${data.id}`, {
                method: "PATCH",
                headers: {'Content-Type':'application/json'},
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


    return { myPhotos, isLoading, error, refetch: ChangeAlbumPhoto }
}