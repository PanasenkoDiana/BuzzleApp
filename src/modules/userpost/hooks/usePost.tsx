import { Result } from '../../auth/types';
import { IPostCart } from '../types';


export const usePost = {
    createPost: async function ( data: IPostCart ): Promise<Result<string> | undefined> {
        try {
            const response = await fetch(
                "http://192.168.3.4:8000/api/posts/create",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                }
            )

            const result: Result<string> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}
			return result;
        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
    },

    getAllPosts: async function (): Promise<Result<IPostCart[]> | undefined> {
        try {
            const response = await fetch(
                "http://192.168.3.4:8000/api/posts/all"
            )

            const result: Result<IPostCart[]> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}

			return result;
        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
    },
    getPost: async function (id: number): Promise<Result<IPostCart> | undefined> {
        try {
            const response = await fetch(
                `http://192.168.3.4:8000/api/posts/${id}`
            )

            const result: Result<IPostCart> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}
			return result;
        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
    },
    deletePost: async function (id: number): Promise<Result<string> | undefined> {
        try {
            const response = await fetch(
                "http://192.168.3.4:8000/api/posts/delete", 
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(id)
                }
            )

            const result: Result<string> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}
			return result;
        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
    },
    changePost: async function (data: IPostCart): Promise<Result<IPostCart> | undefined> {
        try {
            const response = await fetch(
                "http://192.168.3.4:8000/api/posts/change", 
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                }
            )

            const result: Result<IPostCart> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return result;
			}
			return result;
        } catch (error) {
			return { status: "error", message: "An unexpected error occurred" };
		}
    },
}