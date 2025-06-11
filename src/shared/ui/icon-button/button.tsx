import { TouchableOpacity } from "react-native";
import { IIconButtonProps } from "./button.types";
import { styles } from "./button.styles";



export function IconButton(props: IIconButtonProps) {
    

    return(
        <TouchableOpacity style={[styles.buttonStyles, props.style ]}  onPress={props.onPress}>
            {props.icon}
        </TouchableOpacity>
    )
}