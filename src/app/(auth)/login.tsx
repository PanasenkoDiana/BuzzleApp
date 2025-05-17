import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from "../../shared/ui/colors";
import { LoginForm } from "../../modules/auth/ui";
import { useEffect } from "react";
import { WelcomeBlock } from "../../modules/auth/ui";
export default function Login() {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.plum }}>
            <View style={{flex: 1, backgroundColor: COLORS.plum, gap: 60, justifyContent: 'flex-start', alignItems: 'center', flexDirection:'column'}}>
                <WelcomeBlock/>
                <LoginForm/>
                <View style={{ flex: 0.3}}></View>
            </View>
        </View>
    )
}
