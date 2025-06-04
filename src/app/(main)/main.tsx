import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPost } from "../../modules/userpost/pages/UserPost";
import { COLORS } from "../../shared/ui/colors";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { SecondRegisterModal } from "../../modules/auth/ui/second-register-modal";
// import { COLORS } from "../shared/ui/colors";
// import UserPost from "../modules/userpost/pages/UserPost/UserPost";

export default function MainPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const userProfile = {
        avatar: "https://example.com/avatar.jpg",
        firstName: "Іван",
        lastName: "Петренко",
        username: "@ivanp",
        stats: {
            posts: 12,
            followers: 245,
            friends: 89
        }
    };
	const [modalVisible, setModalVisible] = useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (searchParams.get("showRegisterModal") === "true") {
			setIsModalOpen(true);
		}
	}, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: userProfile.avatar }}
                    style={styles.avatar}
                />
                <Text style={styles.fullName}>{userProfile.firstName} {userProfile.lastName}</Text>
                <Text style={styles.username}>{userProfile.username}</Text>
                
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{userProfile.stats.posts}</Text>
                        <Text style={styles.statLabel}>дописи</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{userProfile.stats.followers}</Text>
                        <Text style={styles.statLabel}>читачі</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{userProfile.stats.friends}</Text>
                        <Text style={styles.statLabel}>друзі</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.confirmButton]}>
                        <Text style={styles.buttonText}>Підтвердити</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]}>
                        <Text style={[styles.buttonText, styles.deleteButtonText]}>Видалити</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.albumButton}>
                    <Ionicons name="images-outline" size={24} color={COLORS.black} />
                    <Text style={styles.albumButtonText}>Переглянути альбом</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.postsSection}>
                <Text style={styles.sectionTitle}>Публікації</Text>
                <UserPost />
            </View>
        </ScrollView>
    );
	return (
		<>
			{isModalOpen && (
				<SecondRegisterModal
					isVisible={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
			<UserPost />
		</>
	);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    profileSection: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    fullName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 4,
    },
    username: {
        fontSize: 16,
        color: COLORS.gray,
        marginBottom: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    statLabel: {
        fontSize: 14,
        color: COLORS.gray,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 16,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
        minWidth: 120,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: COLORS.plum,
    },
    deleteButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.darkPlum,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '500',
    },
    deleteButtonText: {
        color: COLORS.darkPlum,
    },
    albumButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 12,
        backgroundColor: COLORS.lightGray,
        borderRadius: 12,
    },
    albumButtonText: {
        fontSize: 16,
        color: COLORS.black,
    },
    postsSection: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 16,
    },
	container: {
		flex: 1,
		borderBottomWidth: 2,
		borderBottomColor: COLORS.lightGray,
		borderRadius: 15,
		padding: 10,
		backgroundColor: COLORS.plum,
	},
	image: {
		width: "100%",
		// flex: 0.5,
		height: "85%",
	},
});
// import { View } from "react-native";
// import { Header } from "../shared/ui/header";
// import { COLORS } from "../shared/ui/colors";

// export default function MainPage(){

//     return(
//         <View style={{flex: 1, backgroundColor: COLORS.white}}>
//             <Header></Header>
//         </View>
//     )
// }
