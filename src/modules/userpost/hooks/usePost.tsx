import { useCallback, useEffect, useState } from 'react';
import { Result } from '../../auth/types';
import { IPostCart, IPostCartForm } from '../types';

export function usePost() {
    const [posts, setPosts] = useState<IPostCart[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
    const [ refresh, setRefresh ] = useState(false)
    
    
	async function createPost(data: IPostCartForm): Promise<Result<IPostCart> | undefined> {
		try {
			const response = await fetch("http://192.168.3.4:8000/api/posts/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
            // console.log(data)

			const result: Result<IPostCart> = await response.json();

			if (result.status === "error") {
				console.log(result.message);
				return result;
			}

			if (result.status === "success") {
                // Вариант 1: добавляем вручную
				// setPosts(prev => [...prev, result.data]);
                
				// // Вариант 2: или перезапрашиваем все посты
				// await getAllPosts();
                // console
                
                
                const all = await getAllPosts();
                
                // console.log("New posts:", posts);
				return result;
			}
		} catch (error) {
            console.error("Create Post Error:", error);
			return { status: "error", message: "An unexpected error occurred" };
		}
	}
    
    // const getAllPosts = useCallback(
    async function getAllPosts(): Promise<Result<IPostCart[]> | undefined> {
        
        try {
            setIsLoading(true);
            const response = await fetch("http://192.168.3.4:8000/api/posts/all");
            
            const result: Result<IPostCart[]> = await response.json();
            
            if (result.status === "error") {
                setError(result.message);
                console.log(result.message);
                return result;
            } else {
                setRefresh(false)
                setPosts(result.data);
                console.log(13123123)
                return result;
            }
            
        } catch (error) {
            console.error("Get All Posts Error:", error);
            return { status: "error", message: "An unexpected error occurred" };
        } finally {
            setIsLoading(false);
        }
    }
    // [])
	async function getPost(id: number): Promise<Result<IPostCart> | undefined> {
		try {
			const response = await fetch(`http://192.168.3.4:8000/api/posts/${id}`);
			const result: Result<IPostCart> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log(result.message);
			} else {
				return result;
			}
		} catch (error) {
			console.error("Get Post Error:", error);
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function deletePost(id: number): Promise<Result<string> | undefined> {
		try {
			const response = await fetch("http://192.168.3.4:8000/api/posts/delete", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(id),
			});

			const result: Result<string> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log(result.message);
			} else {
				// Удаляем из списка
				setPosts(prev => prev.filter(post => post.id !== id));
				return result;
			}
		} catch (error) {
			console.error("Delete Post Error:", error);
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function changePost(data: IPostCart): Promise<Result<IPostCart> | undefined> {
		try {
			const response = await fetch("http://192.168.3.4:8000/api/posts/change", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result: Result<IPostCart> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log(result.message);
			} else {
				// Обновляем конкретный пост в списке
				setPosts(prev =>
					prev.map(post => (post.id === result.data.id ? result.data : post))
				);
				return result;
			}
		} catch (error) {
			console.error("Change Post Error:", error);
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	useEffect(() => {
		getAllPosts();
	}, []);

    // useEffect(() => {
    //     console.log(posts)
    // }, [posts])

	return {
		posts,
		error,
		isLoading,
		createPost,
		getAllPosts,
		getPost,
		deletePost,
		changePost,
        refresh,
        setRefresh,
	};
}
