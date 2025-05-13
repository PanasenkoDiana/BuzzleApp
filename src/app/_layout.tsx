import { useFonts } from "expo-font";
import { UserContextProvider } from "../modules/auth/context/userContext";
import { Providers } from "./providers";
import { Stack } from "expo-router";
import { Text } from 'react-native'

export default function RootLayout(){
    const [fontsLoaded] = useFonts({
        'GTWalsheimPro-Regular': require('../assets/fonts/GTWalsheimPro-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return (<Text>Загрузка шрифта...</Text>)
    }
    
    return(
        <UserContextProvider>
            <Providers>
                <Stack>
                    <Stack.Screen name="index" options={{
                        headerShown: false
                    }}/>

                    <Stack.Screen name="(auth)" options={{
                        headerShown: false
                    }}/>

                    <Stack.Screen name="main" options={{
                        headerShown: false
                    }}/>
                </Stack>
            </Providers>
        </UserContextProvider>
    )
}