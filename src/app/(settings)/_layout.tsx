import { View } from "react-native"
import { Header } from "../../shared/ui/header"
import { Stack, usePathname } from "expo-router"
import { Footer } from "../../shared/ui/footer"

export default function ModalsLayout() {
	const pathname = usePathname();
    const selectedPage = pathname?.split("/").filter(Boolean).pop() || "unknown";
	
	return (
		<View style={{ flex: 1 }}>
			<Header whatCreate="album" selectedPage={selectedPage} />

			<View style={{flex: 1}}>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</View>

			<Footer selectedPage={''} />
		</View>
	)
}
