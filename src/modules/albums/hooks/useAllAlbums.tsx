import { useState, useEffect } from "react"
import { IAlbum } from "../types"
import { SERVER_HOST } from "../../../shared/constants"
import { Result } from "../../../shared/types/result"





export function useAllAlbums(){
    const [ albums, setAlbums ] = useState<IAlbum[] | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)


    async function getAlbums(){
        try {
			setIsLoading(true);
            const response = await fetch(`${SERVER_HOST}api/albums/all`)
            const result: Result<IAlbum[]> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				setError(result.message)
			} else {
				// let all_tags: ITag[] = []
				// result.data.map((tag)=>{
				// 	return all_tags.push(tag.name)
				// })

				setAlbums(result.data)
			}

        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		} finally {
			setIsLoading(false)
		}
    }

    useEffect(()=>{
        getAlbums()
    }, [])


    return { albums, isLoading, error, refetch: getAlbums }
}