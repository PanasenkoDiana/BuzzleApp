import { Stack } from "expo-router";
export default function ChatLayout() {
    return(
        <Stack>
            <Stack.Screen name="Chat" options={{title:"Чат"}}/>   
        </Stack>
    )}