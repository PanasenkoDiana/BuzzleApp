import { useEffect, useState } from "react";
import { IAvatar } from "../../userpost/types/post";
import { Result } from "../../../shared/types/result";
import { SERVER_HOST } from "../../../shared/constants";
import { useUserContext } from "../../auth/context/userContext";

export function useAllMyPhotos(){
    const [ myPhotos, setMyPhotos ] = useState<IAvatar[] | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<string | null>(null)
	const { getToken } = useUserContext()

    async function getMyPhotos(){
        try {
			setIsLoading(true);
			const token = await getToken()
            const response = await fetch(`${SERVER_HOST}api/user/photo/all`, {
				headers: { Authorization: `Bearer ${token}` },
			})
            const result: Result<IAvatar[]> = await response.json();
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