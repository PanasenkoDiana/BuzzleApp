import { useEffect, useState } from 'react';
import { Result } from '../../auth/types';
import { IPostCart, IPostCartForm } from '../types';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { SERVER_HOST } from '../../../shared/constants';

export function usePost() {
	const [posts, setPosts] = useState<IPostCart[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [refresh, setRefresh] = useState(false);

	async function createPost(data: IPostCartForm): Promise<Result<IPostCart> | undefined> {
		try {
			const { images } = data;

			const resizedImages = images
				? await Promise.all(
						images.map(async (image) =>
							await manipulateAsync(
								image.name,
								[{ resize: { width: 1000, height: 1000 } }],
								{ compress: 1, format: SaveFormat.PNG }
							)
						)
				  )
				: [];

			const newData = {
				...data,
				images: resizedImages,
			};

			const response = await fetch(`${SERVER_HOST}api/posts/create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newData),
			});

			const result: Result<IPostCart> = await response.json();

			if (result.status === 'error') {
				console.log(result.message);
				return result;
			}

			if (result.status === 'success') {
				await getAllPosts();
				return result;
			}
		} catch (error) {
			console.error('Create Post Error:', error);
			return { status: 'error', message: 'An unexpected error occurred' };
		}
	}

	async function getAllPosts(): Promise<Result<IPostCart[]> | undefined> {
		try {
			setIsLoading(true);
			const response = await fetch(`${SERVER_HOST}api/posts/all`);
			const result: Result<IPostCart[]> = await response.json();

			if (result.status === 'error') {
				setError(result.message);
				console.log(result.message);
				return result;
			}

			setRefresh(false);
			setPosts(result.data);
			return result;
		} catch (error) {
			console.error('Get All Posts Error:', error);
			return { status: 'error', message: 'An unexpected error occurred' };
		} finally {
			setIsLoading(false);
		}
	}

	async function getPost(id: number): Promise<Result<IPostCart> | undefined> {
		try {
			const response = await fetch(`${SERVER_HOST}api/posts/${id}`);
			const result: Result<IPostCart> = await response.json();

			if (result.status === 'error') {
				setError(result.message);
				console.log(result.message);
			} else {
				return result;
			}
		} catch (error) {
			console.error('Get Post Error:', error);
			return { status: 'error', message: 'An unexpected error occurred' };
		}
	}

	async function deletePost(id: number): Promise<Result<string> | undefined> {
		try {
			const response = await fetch(`${SERVER_HOST}api/posts/delete`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(id),
			});

			const result: Result<string> = await response.json();

			if (result.status === 'error') {
				setError(result.message);
				console.log(result.message);
			} else {
				setPosts((prev) => prev.filter((post) => post.id !== id));
				return result;
			}
		} catch (error) {
			console.error('Delete Post Error:', error);
			return { status: 'error', message: 'An unexpected error occurred' };
		}
	}

	async function changePost(data: IPostCart): Promise<Result<IPostCart> | undefined> {
		try {
			const response = await fetch(`${SERVER_HOST}api/posts/change`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result: Result<IPostCart> = await response.json();

			if (result.status === 'error') {
				setError(result.message);
				console.log(result.message);
			} else {
				setPosts((prev) =>
					prev.map((post) => (post.id === result.data.id ? result.data : post))
				);
				return result;
			}
		} catch (error) {
			console.error('Change Post Error:', error);
			return { status: 'error', message: 'An unexpected error occurred' };
		}
	}

	useEffect(() => {
		getAllPosts();
	}, []);

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
