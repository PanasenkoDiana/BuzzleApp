import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PostCard } from "../../entities/post/ui/PostCard";
import { styles } from "./UserPost.styles";
import { Header } from "../../../../shared/ui/header";
import { Footer } from "../../../../shared/ui/footer";

const POST_DATA = {
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
};

export default function UserPost() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false}>
                {[1, 2, 3, 4].length > 0 ? (
                    [1, 2, 3, 4].map((_, index) => (
                        <PostCard key={index} {...POST_DATA} />
                    ))
                ) : (
                    <Text>No posts available</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}