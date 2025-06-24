import { TouchableOpacity, View, Text } from "react-native";
import { ICustomCheckBoxProps } from "./check-box.types";
import { styles } from "./check-box.styles";
import { CheckIcon, PencilIcon } from "../icons";
import { COLORS } from "../colors";



export function CustomCheckBox(props: ICustomCheckBoxProps) {
    const { checked, onToggle, label } = props

    return(
        <TouchableOpacity style={styles.container} onPress={onToggle}>
			<View style={[styles.checkbox, checked && styles.checkboxChecked]}>
				{checked && (
					<PencilIcon  width={15} height={15} fill={COLORS.plum} />
                    // TODO Добавить иконку
				)}
			</View>
			<Text style={styles.label}>{label}</Text>
		</TouchableOpacity>
    )

}


export function variantTwo(props: ICustomCheckBoxProps) {
    const { checked, onToggle } = props

    return(
        <TouchableOpacity style={styles.container} onPress={onToggle}>
			<View style={[styles.checkbox, checked && styles.checkboxChecked]}>
				{checked && (
					<CheckIcon  width={15} height={15} fill={COLORS.plum} />
                    // TODO Добавить иконку
				)}
			</View>
		</TouchableOpacity>
    )

}

CustomCheckBox.variantTwo = variantTwo