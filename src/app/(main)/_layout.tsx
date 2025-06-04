import { View, StyleSheet } from "react-native";
import { Stack, usePathname } from "expo-router";
import { Header } from "../../shared/ui/header";
import { Footer } from "../../shared/ui/footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../shared/ui/colors";

export default function MainLayout() {
    const pathname = usePathname(); // например: "/main/userPost"
    const selectedPage = pathname?.split("/").filter(Boolean).pop() || "unknown";

    return (
        <View style={styles.container}>
            <Header/>

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
        gap: 15,
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
