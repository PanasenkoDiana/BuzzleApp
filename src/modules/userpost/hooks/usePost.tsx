import { useEffect, useState } from 'react';
import { IPostCart, IPostCartForm } from '../types';
import { SERVER_HOST } from '../../../shared/constants';
import { Result } from '../../../shared/types/result';

export function usePost() {
    const [posts, setPosts] = useState<IPostCart[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(false);

    // Создание поста — images уже base64 строки
    async function createPost(data: IPostCartForm): Promise<Result<IPostCart> | undefined> {
        try {
            const response = await fetch(`${SERVER_HOST}api/posts/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data), // data.images — base64 строки
            });

            const result: Result<IPostCart> = await response.json();

            if (result.status === 'error') {
                setError(result.message);
                console.log('Create Post Error:', result.message);
                return result;
            }

            if (result.status === 'success') {
                await getAllPosts();
                return result;
            }
        } catch (error) {
            console.error('Create Post Exception:', error);
            return { status: 'error', message: 'An unexpected error occurred' };
        }
    }

    // Получить все посты
    async function getAllPosts(): Promise<Result<IPostCart[]> | undefined> {
        try {
            setIsLoading(true);
            const response = await fetch(`${SERVER_HOST}api/posts/all`);
            const result: Result<IPostCart[]> = await response.json();

            if (result.status === 'error') {
                setError(result.message);
                console.log('Get All Posts Error:', result.message);
                return result;
            }

            setRefresh(false);
            setPosts(result.data);
            return result;
        } catch (error) {
            console.error('Get All Posts Exception:', error);
            return { status: 'error', message: 'An unexpected error occurred' };
        } finally {
            setIsLoading(false);
        }
    }

    // Получить пост по ID
    async function getPost(id: number): Promise<Result<IPostCart> | undefined> {
        try {
            const response = await fetch(`${SERVER_HOST}api/posts/${id}`);
            const result: Result<IPostCart> = await response.json();

            if (result.status === 'error') {
                setError(result.message);
                console.log('Get Post Error:', result.message);
                return result;
            }

            return result;
        } catch (error) {
            console.error('Get Post Exception:', error);
            return { status: 'error', message: 'An unexpected error occurred' };
        }
    }

    // Удалить пост по ID
    async function deletePost(id: number): Promise<Result<string> | undefined> {
        try {
            const response = await fetch(`${SERVER_HOST}api/posts/delete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            const result: Result<string> = await response.json();

            if (result.status === 'error') {
                setError(result.message);
                console.log('Delete Post Error:', result.message);
                return result;
            }

            setPosts((prev) => prev.filter((post) => post.id !== id));
            return result;
        } catch (error) {
            console.error('Delete Post Exception:', error);
            return { status: 'error', message: 'An unexpected error occurred' };
        }
    }

    // Изменить пост
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
                console.log('Change Post Error:', result.message);
                return result;
            }

            setPosts((prev) =>
                prev.map((post) => (post.id === result.data.id ? result.data : post))
            );
            return result;
        } catch (error) {
            console.error('Change Post Exception:', error);
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
