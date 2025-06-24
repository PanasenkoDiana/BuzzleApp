import { View, StyleSheet } from "react-native";
import { Stack, usePathname } from "expo-router";
import { Header } from "../../shared/ui/header";
import { Footer } from "../../shared/ui/footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../shared/ui/colors";
import { useEffect } from "react";
import { useUserContext } from "../../modules/auth/context/userContext";

export default function MainLayout() {
	const pathname = usePathname();
	const selectedPage = pathname?.split("/").filter(Boolean).pop() || "unknown";
	const { fetchUser } = useUserContext();

	useEffect(() => {
		fetchUser();
	}, [pathname]);
	
	return (
		<View style={styles.container}>
			<Header />

			<View style={styles.content}>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				/>
			</View>

			<Footer selectedPage={selectedPage} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent:'flex-start',
		gap: 10,
	},
	content: {
		flex: 1,
		// borderWidth: 2,
		// borderColor: COLORS.lightGray,
		// borderRadius: 15,
		// padding: 3,
		// justifyContent:'flex-start',
	},
});
