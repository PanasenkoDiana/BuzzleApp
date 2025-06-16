import { useEffect, useState } from "react";
import { ITag } from "../types";
import { SERVER_HOST } from "../../../shared/constants"
import { Result } from "../../../shared/types/result";

export function useAllTags(){
	const [tags, setTags] = useState<ITag[]>([])
	const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    async function allTags() {
        try {
			setIsLoading(true);
            const response = await fetch(`${SERVER_HOST}api/tags/all`)
            const result: Result<ITag[]> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				setError(result.message)
			} else {
				setTags(result.data)
			}

        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		} finally {
			setIsLoading(false)
		}
    }

	useEffect(()=>{
		allTags()
	}, [])

	return {tags, isLoading, error, allTags}
}