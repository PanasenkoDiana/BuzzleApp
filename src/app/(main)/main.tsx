import { View, Image, StyleSheet } from "react-native";
import { Header } from "../../shared/ui/header";
import { Footer } from "../../shared/ui/footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserPost } from "../../modules/userpost/pages/UserPost";
import { COLORS } from "../../shared/ui/colors";
import { useState } from "react";
// import { COLORS } from "../shared/ui/colors";
// import UserPost from "../modules/userpost/pages/UserPost/UserPost";

export default function MainPage() {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<UserPost></UserPost>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderBottomWidth: 2,
        borderBottomColor: COLORS.lightGray,
		borderRadius: 15,
		padding: 10,
		// justifyContent: 'flex-start',
		// paddingBottom: 70,
		// paddingTop:60,
		// gap:0,
		backgroundColor: COLORS.plum,
		// alignContent: "center",
		// justifyContent: "flex-start",
		// flexDirection: "column",
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
