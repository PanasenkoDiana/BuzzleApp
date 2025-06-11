import { TouchableOpacity, View, Text } from "react-native";
import { PencilIcon } from "../../../../shared/ui/icons"; 
import { styles } from "./header.styles";
import { COLORS } from "../../../../shared/ui/colors";
import { useState } from 'react';
import { FloppyDiskIcon } from "../../../../shared/ui/icons/disk-icon";



export function SettingsChangeHeader(props: {title: string, onRedact: ()=> void}) {
    const [isEditing, setIsEditing] = useState(false);

    const handlePress = () => {
        setIsEditing(!isEditing);
        props.onRedact();
    };

    return(
        <View style={styles.changeSettingsHeader}>
            <Text style={styles.changeSettingsTitle}>{props.title}</Text>
            <TouchableOpacity onPress={handlePress} style={styles.changeSettingsIconView}>
                {isEditing ? (
                    <FloppyDiskIcon width={30} height={30} stroke={COLORS.darkPlum}/>
                ) : (
                    <PencilIcon width={20} height={20} fill={COLORS.darkPlum}/>
                )}
            </TouchableOpacity>
        </View>
    )
}