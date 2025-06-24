import { View } from "react-native"
import { Header } from "../../shared/ui/header"
import { Stack, usePathname } from "expo-router"
import { Footer } from "../../shared/ui/footer"
import { useUserContext } from "../../modules/auth/context/userContext";
import { useEffect } from "react";

export default function ModalsLayout() {
	const pathname = usePathname();
    const selectedPage = pathname?.split("/").filter(Boolean).pop() || "unknown";
	const { fetchUser } = useUserContext();

	useEffect(() => {
		fetchUser();
	}, [pathname]);

	return (
		<View style={{ flex: 1 }}>
			<Header />

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
