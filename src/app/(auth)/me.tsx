import { SafeAreaView, StatusBar, Button } from "react-native";
import { COLORS } from "../../shared/ui/colors";
import { useUserContext } from "../../modules/auth/context/userContext";
import { Text } from 'react-native'
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Me() {
    const { user, setUser } = useUserContext(); 
    const router = useRouter()

    const handleLogout = () => {
        setUser(null);
        AsyncStorage.removeItem("token"); 
        router.push('/login')
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{user?.email}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </SafeAreaView>
    );
}