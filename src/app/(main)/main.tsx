import { View, Image, StyleSheet } from "react-native";
import { Header } from "../../shared/ui/header";
import { Footer } from "../../shared/ui/footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPost } from "../../modules/userpost/pages/UserPost";
import { COLORS } from "../../shared/ui/colors";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { SecondRegisterModal } from "../../modules/auth/ui/second-register-modal";
// import { COLORS } from "../shared/ui/colors";
// import UserPost from "../modules/userpost/pages/UserPost/UserPost";

export default function MainPage() {
	const [modalVisible, setModalVisible] = useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (searchParams.get('showRegisterModal') === 'true') {
			setIsModalOpen(true);
		}
	}, []);


	return (
		<UserPost></UserPost>
		<>
		{/* <SecondRegisterModal isVisible={isModalOpen} onClose={()=>setIsModalOpen(false)} /> */}
		{ isModalOpen && <SecondRegisterModal isVisible={isModalOpen} onClose={()=>setIsModalOpen(false)} /> }

		<UserPost ></UserPost>
		</>
	);
}
const styles = StyleSheet.create({
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
