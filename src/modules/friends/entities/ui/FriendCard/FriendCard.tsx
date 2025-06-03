import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./FriendCard.styles";
import { IFriend } from "../../../types/friend";

export function FriendCard(props: IFriend) {
    return (
        <View style={styles.container}>
            <View style={styles.friendInfo}>
                <Image source={{ uri: props.profileImage ?? ""}}/>
                <View style={styles.names}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text>{props.username}</Text>
                </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button}>
                    <Text>Повідомлення</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text>Видалити</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}