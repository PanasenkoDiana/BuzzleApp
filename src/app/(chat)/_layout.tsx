import { Stack } from "expo-router";
import { View } from "react-native";
import { Footer } from "../../shared/ui/footer";
import { ChatsLayout } from "../../modules/chats/entities/ui/ChatsLayout";
import { Header } from "../../shared/ui/header";
export default function ChatLayout() {
    return(
        <View style={{flex:1}}>
            <Header selectedPage="chats" whatCreate="post" />



            <ChatsLayout selectedPage="chats" setSelectedPage={(selectedPage: string) => {}}>
                {/* <View></View> */}
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="chat" options={{title:"Чат"}}/>   
                </Stack>
            </ChatsLayout>


            

            <Footer selectedPage={'chats'} />
        </View> 
    )
}