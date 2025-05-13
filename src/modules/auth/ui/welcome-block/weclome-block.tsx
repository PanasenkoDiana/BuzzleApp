import { View, Text } from "react-native";
import { styles } from "./welcome-block.styles";
import { LogoImage } from "../../../../shared/ui/images";

export function WelcomeBlock(){
    return (
        <View style={styles.container}>
            <LogoImage style={styles.image}/>
        </View>
    )
}