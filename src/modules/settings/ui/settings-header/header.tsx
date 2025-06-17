import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./header.styles";
import { settingsHeaderProps } from "./header.types";
import { useRouter } from "expo-router";




export function SettingsHeader(props: settingsHeaderProps) {
    const router = useRouter()


    return(
        <View style={styles.settingsNav}>
            <TouchableOpacity onPress={()=>{router.replace('/settings')}}><Text style={props.selectedPage === 'settings' ? styles.settingsSelectedTextNav : styles.settingsTextNav}>Особиста інформація</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{router.replace('/albums')}}><Text style={props.selectedPage === 'albums' ? styles.settingsSelectedTextNav : styles.settingsTextNav}>Альбоми</Text></TouchableOpacity>
        </View>
    )
}