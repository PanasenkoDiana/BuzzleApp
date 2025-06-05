import { useState, useEffect } from 'react';
import { useUserContext } from '../../auth/context/userContext';
import { SERVER_HOST } from '../../../shared/constants/api';

interface Post {
  id: number;
  name: string;
  text: string;
  tags: Array<{ name: string }>;
  images: string[];
  userId: number;
}

export const usePost = (userPostsOnly: boolean = false) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();

  const updatePost = async (postId: number, updatedData: Partial<Post>) => {
    try {
      const response = await fetch(`${SERVER_HOST}api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      
      // Обновляем состояние после успешного редактирования
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? { ...post, ...updatedPost } : post
        )
      );

      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_HOST}api/posts/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      
      // Фильтруем посты, если нужны только посты пользователя
      const filteredPosts = userPostsOnly 
        ? data.filter((post: Post) => post.userId === user?.id)
        : data;
      
      setPosts(filteredPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [userPostsOnly, user?.id]);

  return { posts, isLoading, getAllPosts, updatePost };
};