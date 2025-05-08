import { SafeAreaView, StatusBar, Button, Image, View } from "react-native";
import { useUserContext } from "../../modules/auth/context/userContext";
import { Text } from 'react-native'
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
const COLORS = {
    white: '#FFFFFF'
  };
export default function Me() {
    const { user, setUser } = useUserContext(); 
    const router = useRouter()

    const handleLogout = () => {
        setUser(null);
        AsyncStorage.removeItem("token"); 
        router.push('/login')
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar barStyle="dark-content" />
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>WORLD IT</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    <Text style={{ fontSize: 16 }}>{user?.email}</Text>
                </View>
                <Text style={{ marginVertical: 16 }}>Иногда лучшие идеи рождаются в тиши 🌿 Природа, книга и спокойствие — всё, что нужно, чтобы перезагрузиться. #отдых #вдохновение #жизнь #природа #чтение #спокойствие #гармония</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={{ width: 100, height: 100 }} />
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={{ width: 100, height: 100 }} />
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={{ width: 100, height: 100 }} />
                </View>
                <Button title="Logout" onPress={handleLogout} />
            </View>
        </SafeAreaView>
    );
}






//import { SafeAreaView, StatusBar, Button } from "react-native";
//import { COLORS } from "../../shared/ui/colors";
//import { useUserContext } from "../../modules/auth/context/userContext";
//import { Text } from 'react-native'
//import { useRouter } from "expo-router";
//import AsyncStorage from "@react-native-async-storage/async-storage";

//export default function Me() {
   // const { user, setUser } = useUserContext(); 
    //const router = useRouter()

    //const handleLogout = () => {
    //    setUser(null);
    //    AsyncStorage.removeItem("token"); 
     //   router.push('/login')
    //};

    //return (
    //    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
     //       <Text>{user?.email}</Text>
     //       <Button title="Logout" onPress={handleLogout} />
     //   </SafeAreaView>
   //);
//}