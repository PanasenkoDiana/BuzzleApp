import { ReactNode } from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./ChatsLayout.styles";
import { ChatIcon, ContactsIcon } from "../../../../../shared/ui/icons";
import { useRouter } from "expo-router";


interface IChatsLayout {
    selectedPage: string;
    setSelectedPage: (page: string) => void;
    children: ReactNode;
}

export function ChatsLayout(props: IChatsLayout) {
    const { selectedPage, setSelectedPage, children } = props;
    const router = useRouter();

    const handlePageChange = (page: string) => {
        setSelectedPage(page);
        switch (page) {
            case 'contacts':
                router.push('/contacts');
                break;
            case 'notifications':
                router.push('/notifications');
                break;
            case 'chats':
                router.push('/group-chats');
                break;
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <View style={styles.navContainer}>
                <TouchableOpacity
                    onPress={() => handlePageChange("contacts")}
                    style={styles.navButtom}
                >
                    {selectedPage === "contacts" && <View style={styles.selectedBlock} />}
                    <ContactsIcon style={{ width: 25, height: 25 }} />
                    <Text style={styles.text}>Контакти</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handlePageChange("notifications")}
                    style={styles.navButtom}
                >
                    {selectedPage === "notifications" && <View style={styles.selectedBlock} />}
                    <ChatIcon style={{ width: 20, height: 20 }} />
                    <Text style={styles.text}>Повідомлення</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handlePageChange("chats")}
                    style={styles.navButtom}
                >
                    {selectedPage === "chats" && <View style={styles.selectedBlock} />}
                    <ChatIcon style={{ width: 20, height: 20 }} />
                    <Text style={styles.text}>Групові чати</Text>
                </TouchableOpacity>
            </View>
            {children}
        </KeyboardAvoidingView>
    );
}
