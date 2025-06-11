import { useState, useEffect } from "react"
import { IMyPhotosList } from "../types"
import { SERVER_HOST } from "../../../shared/constants"
import { Result } from "../../../shared/types/result"





export function useMyPhotos(){
    const [ myPhotos, setMyPhotos ] = useState<IMyPhotosList | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)


    async function getMyPhotos(){
        try {
			setIsLoading(true);
            const response = await fetch(`${SERVER_HOST}api/user/photo/all`)
            const result: Result<IMyPhotosList> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				setError(result.message)
			} else {
				// let all_tags: ITag[] = []
				// result.data.map((tag)=>{
				// 	return all_tags.push(tag.name)
				// })

				setMyPhotos(result.data)
			}

        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		} finally {
			setIsLoading(false)
		}
    }


    useEffect(()=>{
        getMyPhotos()
    }, [])


    return { myPhotos, isLoading, error, refetch: getMyPhotos }
}