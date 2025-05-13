import { IButtonProps } from "./button.types";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./button.styles"



export function Button(props: IButtonProps){

    const { label, disabled } = props
    return(
        <TouchableOpacity

        style={[styles.button, disabled ? styles.disabled : undefined]} 
        disabled={disabled}
        {...props}
        >

            <Text style={{ color: disabled ? '#4B3B54' : '#FFFFFF', fontSize: 16, fontWeight: '600' }}>{label}</Text>
        </TouchableOpacity>
    )
}