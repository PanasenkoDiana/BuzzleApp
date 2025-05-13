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


export default function Register() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.plum }}>
			<View style={{flex: 1, backgroundColor: COLORS.plum, gap: 60}}>
				<WelcomeBlock/>
				<RegisterForm />
				<View style={{ flex: 0.1}}></View>
			</View>
		</SafeAreaView>
	);
}
