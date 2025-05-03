import { SafeAreaView, StatusBar } from "react-native";
import { COLORS } from "../../shared/ui/colors";
import { useUserContext } from "../../modules/auth/context/userContext";
import { Text } from 'react-native'
 

export default function Me (){
    const { user } = useUserContext()

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login success</Text>
        </SafeAreaView>
    )
}