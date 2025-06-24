import { useEffect, useState } from "react";
import { ICreatePost, IPostForm } from "../types";
import { IPost } from '../types/post'
import { SERVER_HOST } from "../../../shared/constants";
import { Result } from "../../../shared/types/result";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function usePost() {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [myPosts, setMyPosts] = useState<IPost[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [refresh, setRefresh] = useState(false);

	async function createPost(
		data: IPostForm
	): Promise<Result<IPost> | undefined> {
		try {
			console.log(data)
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/posts/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			const result: Result<IPost> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log("Create Post Error:", result.message);
				return result;
			}

			if (result.status === "success") {
				return result;
			}
		} catch (error) {
			console.error("Create Post Exception:", error);
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function getAllPosts(): Promise<Result<IPost[]> | undefined> {
		try {
			setIsLoading(true);
			const response = await fetch(`${SERVER_HOST}api/posts/all`);
			const result: Result<IPost[]> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log("Get All Posts Error:", result.message);
				return result;
			}

			setRefresh(false);
			setPosts(result.data);
			return result;
		} catch (error) {
			console.error("Get All Posts Exception:", error);
			return { status: "error", message: "An unexpected error occurred" };
		} finally {
			setIsLoading(false);
		}
	}

	async function getMyPosts(): Promise<Result<IPost[]> | undefined> {
		try {
			setIsLoading(true);
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/posts/myPosts`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result: Result<IPost[]> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log("Get My Posts Error:", result.message);
				return result;
			}

			setRefresh(false);
			setMyPosts(result.data);
			return result;
		} catch (error) {
			console.error("Get My Posts Exception:", error);
			return { status: "error", message: "An unexpected error occurred" };
		} finally {
			setIsLoading(false);
		}
	}

	async function getPost(id: number): Promise<Result<IPost> | undefined> {
		try {
			const response = await fetch(`${SERVER_HOST}api/posts/${id}`);
			const result: Result<IPost> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log("Get Post Error:", result.message);
				return result;
			}

			return result;
		} catch (error) {
			console.error("Get Post Exception:", error);
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function deletePost(id: number): Promise<Result<string> | undefined> {
		try {
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/posts/delete`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ id }),
			});

			const result: Result<string> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log("Delete Post Error:", result.message);
				return result;
			}

			setPosts((prev) => prev.filter((post) => post.id !== id));
			setMyPosts((prev) => prev.filter((post) => post.id !== id));
			return result;
		} catch (error) {
			console.error("Delete Post Exception:", error);
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	async function changePost(
		data: IPostForm
	): Promise<Result<IPost> | undefined> {
		try {
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(`${SERVER_HOST}api/posts/change`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			const result: Result<IPost> = await response.json();

			if (result.status === "error") {
				setError(result.message);
				console.log("Change Post Error:", result.message);
				return result;
			}

			setPosts((prev) =>
				prev.map((post) =>
					post.id === result.data.id ? result.data : post
				)
			);
			setMyPosts((prev) =>
				prev.map((post) =>
					post.id === result.data.id ? result.data : post
				)
			);

			return result;
		} catch (error) {
			console.error("Change Post Exception:", error);
			return { status: "error", message: "An unexpected error occurred" };
		}
	}

	useEffect(() => {
		getAllPosts();
	}, []);

	return {
		posts,
		myPosts,
		error,
		isLoading,
		refresh,
		setRefresh,
		createPost,
		getAllPosts,
		getMyPosts,
		getPost,
		deletePost,
		changePost,
	};
}
