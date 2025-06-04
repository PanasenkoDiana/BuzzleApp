import { TouchableOpacity, View, Text } from "react-native";
import { PencilIcon } from "../../../../shared/ui/icons";
import { styles } from "./header.styles";
import { COLORS } from "../../../../shared/ui/colors";


export function SettingsChangeHeader(props: {title: string, onRedact: ()=> void}) {
    return(
        <View style={styles.changeSettingsHeader}>
            <Text style={styles.changeSettingsTitle}>{props.title}</Text>
            <TouchableOpacity  onPress={()=>props.onRedact()} style={styles.changeSettingsIconView}>
                <PencilIcon width={20} height={20} fill={COLORS.darkPlum}/>
            </TouchableOpacity>
        </View>
    )
}