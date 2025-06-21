import { useFonts } from "expo-font";
import { UserContextProvider } from "../modules/auth/context/userContext";
import { Providers } from "./providers";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		"GTWalsheimPro-Regular": require("../assets/fonts/GTWalsheimPro-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return <Text>Загрузка шрифта...</Text>;
	}

	return (
		<Providers>
			<SafeAreaView style={{ flex: 1 }}>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name="(auth)"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(chat)"
						options={{
							headerShown: false,
						}}
					/>

					{/* <Stack.Screen name="main" options={{
                        headerShown: false
                    }}/> */}

					{/* <Stack.Screen name="userPost" options={{
                        headerShown: false
                    }}/> */}
					<Stack.Screen
						name="(main)"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(settings)"
						options={{
							headerShown: false,
							// presentation: 'containedModal',
						}}
					/>
				</Stack>
			</SafeAreaView>
		</Providers>
	);
}
