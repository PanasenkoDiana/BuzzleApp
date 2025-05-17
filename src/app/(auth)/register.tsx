import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WelcomeBlock } from "../../modules/auth/ui";
import { COLORS } from "../../shared/ui/colors";
import { RegisterForm } from "../../modules/auth/ui/register-form/step-one";
import { Button } from "../../shared/ui/button";
import { Header } from "../../shared/ui/header";
import { Footer } from "../../shared/ui/footer";
import { useState } from "react";
import { Modal } from "../../shared/ui/modal";

export default function Register() {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.plum }}>
			<View style={{ flex: 1, backgroundColor: COLORS.plum, gap: 60, justifyContent: 'flex-start', alignItems: 'center', flexDirection:'column'}}>
				<WelcomeBlock />
				<RegisterForm />

				{/* <TouchableOpacity onPress={() => setModalVisible(true)}>
					<Text style={{ color: "white", textAlign: "center" }}>
						Відкрити модалку
					</Text>
				</TouchableOpacity> */}

				{/* <Modal
					title="Створити пост"
					visible={modalVisible}
					onClose={() => setModalVisible(false)}
				>
					<Text style={{ color: "black", fontSize: 16 }}>Це модалка</Text>
				</Modal> */}

				{/* <View style={{ alignItems: "center" }}>
					<Link href="/main">
						<Text
							style={{
								color: "black",
								fontSize: 16,
								textDecorationLine: "underline",
							}}
						>
							Перейти на головну
						</Text>
					</Link>
				</View> */}

				<View style={{ flex: 0.1 }} />
			</View>
			<StatusBar style="auto" />
		</View>
	);
}
