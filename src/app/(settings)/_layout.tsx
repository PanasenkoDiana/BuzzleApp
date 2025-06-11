import { View } from "react-native"
import { Header } from "../../shared/ui/header"
import { Stack } from "expo-router"
import { Footer } from "../../shared/ui/footer"

export default function ModalsLayout() {
	return (
		<View style={{ flex: 1 }}>
			<Header whatCreate="album" />

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
