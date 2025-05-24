import { useEffect, useState } from "react";
import { Result } from "../../auth/types";
import { ITag } from "../types";


export function useAllTags(){
	const [tags, setTags] = useState<ITag[]>([])
	const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    async function allTags() {
        try {
			setIsLoading(true);
            const response = await fetch('http://192.168.3.4:8000/api/tags/all')
            const result: Result<ITag[]> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				setError(result.message)
			} else {
				// let all_tags: ITag[] = []
				// result.data.map((tag)=>{
				// 	return all_tags.push(tag.name)
				// })

				setTags(result.data)
			}

        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
    }

	useEffect(()=>{
		allTags()
	}, [])

	return {tags, isLoading, error, allTags}
}