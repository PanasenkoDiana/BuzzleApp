// import { useEffect, useState } from "react";
// import { Result } from "../../auth/types";
// import { IPostCart } from "../types";


// export function useAllPosts(){
// 	const [posts, setPosts] = useState<IPostCart[]>([])
// 	const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);


//     async function fetchPosts() {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(
//                 "http://192.168.3.4:8000/api/posts/all"
//             );

//             const result: Result<IPostCart[]> = await response.json();
//             if (result.status === "error") {
//                 setError(result.message);
//                 return;
//             } else {
//                 setPosts(result.data);
//             }
//         } catch (error) {
//             setError("Произошла ошибка при загрузке постов");
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchPosts();
//     }, []);

// 	return {posts, isLoading, error, refetch: fetchPosts}
// }
// // import { Result } from "../../auth/types";
// // import { IPostCart } from "../types";


// // export function useAllPosts(){
// // 	const [posts, setPosts] = useState<IPostCart[]>([])
// // 	const [isLoading, setIsLoading] = useState(false);
// //     const [error, setError] = useState<string | null>(null);


// //     async function allPosts() {
// // 		setIsLoading(true)
// // 		setError(null)

// //         try {
			
// //             const response = await fetch(
// //                 "http://192.168.3.4:8000/api/posts/all"
// //             )

// //             const result: Result<IPostCart[]> = await response.json();
// // 			if (result.status === "error") {
// // 				setError(result.message)
// // 				return { status: "error", message: result.message };
// // 			} else{
// // 				setPosts(result.data)
// // 			}

// // 			// setPosts(result.data)
// //         } catch (error) {
// // 			return { status: "error", message: "An unexpected error occurred" };
// // 		} finally {
// // 			setIsLoading(false)
// // 		}
// //     }

// // 	useEffect(()=>{
// // 		allPosts()
// // 	}, [])

// // 	return {posts, isLoading, error, allPosts}
// // }