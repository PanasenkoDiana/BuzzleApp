import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WelcomeBlock } from "../../modules/auth/ui";
import { VerifyForm } from "../../modules/auth/ui/register-form/step-two/form";
import { Link } from "expo-router";
import { COLORS } from "../../shared/ui/colors";

export default function Verify() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<WelcomeBlock />
			<VerifyForm />
			<Text style={{ textAlign: "center" }}>
				<Link href={"/register"}>Назад</Link>
			</Text>
		</SafeAreaView>
	);
}
