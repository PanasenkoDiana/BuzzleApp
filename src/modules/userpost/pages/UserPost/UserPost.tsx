import { FlatList, Modal, ScrollView, Text, View,ActivityIndicator, TouchableOpacity, RefreshControl } from "react-native";

import { PostCard } from "../../entities/post/ui/PostCard";
import { styles } from "./UserPost.styles";
import { COLORS } from "../../../../shared/ui/colors";
import { useCallback, useEffect, useState } from "react";
import { usePost } from "../../hooks";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Button } from "../../../../shared/ui/button";

const POST_DATA =[ {
    username: "Lina Li",
    avatarUrl: "https://www.shutterstock.com/image-photo/beautiful-woman-on-bright-gray-600nw-2459807745.jpg",
    title: "Природа, книга і спокій 🌿",
    description: "Інколи найкращі ідеї народжуються в тиші 🌿\nПрирода, книга і спокій — усе, що потрібно, аби перезавантажитись.\n#відпочинок #натхнення #життя #природа #читання #спокій #гармонія",
    images: [
        "https://i.pinimg.com/736x/f2/63/f0/f263f0db504ecebc3145a56750145b31.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/026/586/056/small/beautiful-modern-house-exterior-with-carport-modern-residential-district-and-minimalist-building-concept-by-ai-generated-free-photo.jpg",
        "https://img.freepik.com/premium-photo/joyfull-woman-sitting-car-roof-enjoying-wind-views-scenic-grassy-steppe-plain-looking-distance-smiling_352677-181.jpg",
        "https://elements-resized.envatousercontent.com/elements-video-cover-images/files/204361030/preview.jpg?w=500&cf_fit=cover&q=85&format=auto&s=345a8feed420b829575e0a31c456381fdacc138b0981715ff4078e576ca5dd58"
    ],
    likes: 120,
    views: 890
}];
// export default function UserPost() {
//     const { posts, isLoading, error } = useAllPosts()

//     return(
//         <ScrollView showsVerticalScrollIndicator={false}>
//             <View style={styles.container}>
//                 { isLoading 
//                 ? <Text>123123213</Text> 
//                 : posts.map((post, index) => (
//                     // <PostCard
//                     //     key={index}
//                     //     // username={'1'}
//                     //     // avatarUrl={'1'}
//                     //     title={post.name}
//                     //     description={post.text}
//                     //     images={post.images}
//                     //     likes={1}
//                     //     views={2}
//                     // />
//                     <Text>123123213</Text>
//                 ))}
//             </View>
//         </ScrollView>

//     )
// }

// export default function UserPost() {
//     const { posts } = useAllPosts()


//     return (
//         // <ScrollView
//         //     style={styles.scroll}
//         //     contentContainerStyle={styles.container}
//         //     showsVerticalScrollIndicator={false}
//         // >
//         <FlatList
//             data={posts}
//             keyExtractor={(_, index) => index.toString()}
//             contentContainerStyle={styles.container}
//             renderItem={({ item }) => (
//                 <Text>123123</Text>
//             )}
//             showsVerticalScrollIndicator={false}
//         />
//             //  {[1, 2, 3, 4].length > 0 ? (
//             //     [1, 2, 3, 4].map((_, index) => (
//             //         <PostCard key={index} {...POST_DATA} />
//             //     ))
//             // ) : (
//             //     <Text>No posts available</Text>
//             // )} 
//         // </ScrollView>
//     );
// }


export default function UserPost() {
    const { posts, isLoading, getAllPosts } = usePost();
    const [ refresh, setRefresh ] = useState(false)
    const [ key, setKey ] = useState(0)
    
    function onRefresh(){
        setRefresh(true)
        setTimeout(()=>{setRefresh(false)}, 2000)
    }
    // const [localPosts, setLocalPosts] = useState(posts);

    // useFocusEffect(()=>{
    //     useCallback(()=>{
    //         getAllPosts()
    //     }, [])
    // }, )

    useEffect(()=>{
        console.log(isLoading)
    }, [isLoading])

    if (isLoading) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.container}>
            {/* <RefreshControl refreshing={refresh} onRefresh={()=>getAllPosts()}> */}
                <FlatList
                    refreshing = {isLoading}
                    // onref
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={()=>getAllPosts()}/>}
                    key={key}
                    data={posts}
                    keyExtractor={(post, index) => post.id.toString()}
                    extraData={refresh}
                    // contentContainerStyle={{ flex: 1 }}
                    renderItem={({ item, index }) => (
                        <PostCard
                            // key={post.id}
                            id={item.id}
                            username={"1"}
                            avatarUrl={"1"}
                            title={item.name}
                            tags={item.tags}
                            description={item.text}
                            images={item.images}
                            likes={1}
                            views={2}
                        />
                    )}
                />
            {/* </RefreshControl> */}
            {/* <TouchableOpacity onPress={()=>getAllPosts()}><Text>Get all post</Text></TouchableOpacity> */}
        </View>
    );
}