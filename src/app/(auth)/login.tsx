import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from 'expo-router';
import { Text } from 'react-native'
import { COLORS } from "../../shared/ui/colors";
import { LoginForm, WelcomeBlock } from "../../modules/auth/ui";

export default function Login() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar style="auto" />
            <WelcomeBlock/>
            <LoginForm/>
            <Text style={{textAlign: 'center'}}>Don’t have an account? <Link href={'/register'}>Register now</Link>
            </Text>
        </SafeAreaView>
    )
}