import { UserContextProvider } from "../modules/auth/context/userContext";
import { Providers } from "./providers";
import { Stack } from "expo-router";

export default function RootLayout(){
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
                </Stack>
            </Providers>
        </UserContextProvider>
    )
}