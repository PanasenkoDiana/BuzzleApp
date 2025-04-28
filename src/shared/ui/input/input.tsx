import { TextInput, Text, View, TouchableOpacity } from "react-native"
import { styles } from "./input.styles"
import { IInputProps, IInputPasswordProps } from "./input.types"
import { KeyIcon, EyeIcon, EyeSlashIcon, ErrorIcon } from "../icons";
import { useState } from "react";

export function Input(props: IInputProps) {
    const { label, leftIcon, error, rightIcon, style, ...otherProps } = props
    return (
        <View style={styles.inputContainer}>

            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputWrapper} >
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        leftIcon ? styles.inputWithLeftIcon : undefined,
                        rightIcon ? styles.inputWithRightIcon : undefined,
                        style
                    ]}
                    {...otherProps}
                />
                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>
            
            {error &&
                <View style={styles.errorBlock}>
                    <View><ErrorIcon width={16} height={16}/></View>
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                </View>
            }

        </View>
    );
}

function Password(props: IInputPasswordProps) {
    const { label, error, style, ...otherProps } = props

    const [hidden, setHidden] = useState(true)

    return (
        <View style={styles.inputContainer}>

            {label && <Text style={styles.label}>{label}</Text>}
            
            <View style={styles.inputWrapper} >
                <View style={styles.leftIcon}><KeyIcon width={30} height={30}/></View>
                <TextInput
                    style={[
                        styles.input,
                        styles.inputWithLeftIcon,
                        styles.inputWithRightIcon,
                        style
                    ]}
                    {...otherProps}
                    secureTextEntry={hidden}
                /> 
                
                <TouchableOpacity style={styles.rightIcon} onPress={() => {
                    setHidden(!hidden)
                }}>
                    { hidden ? <EyeSlashIcon width={30} height={30}/> : <EyeIcon width={30} height={30}/>}
                </TouchableOpacity> 
            </View>
                    
            {error &&
                <View style={styles.errorBlock}>
                    <View><ErrorIcon width={16} height={16}/></View>
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                </View>
            }

        </View>
    );
}
// Input - это функция(но в JS функции = объекты), поэтому можно создать новое свойство Password, значение которого является компонент Password
Input.Password = Password