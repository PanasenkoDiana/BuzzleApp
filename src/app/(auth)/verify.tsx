import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WelcomeBlock } from "../../modules/auth/ui";
import { VerifyForm } from "../../modules/auth/ui/register-form/step-two/form";
import { Link } from "expo-router";
import { COLORS } from "../../shared/ui/colors";

export default function Verify() {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.plum}}>
			<View style={{flex: 1, backgroundColor: COLORS.plum, gap: 60, alignItems: 'center', justifyContent: 'flex-start'}}>
				<WelcomeBlock />
				<VerifyForm />
			</View>
		</SafeAreaView>
	);
}
