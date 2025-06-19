

import { View, Text, TouchableOpacity } from "react-native";
import { Modal } from "../../../../shared/ui/modal";
import { IChangePasswordModalForm, IChangePasswordModalProps } from "./modal.types";
import { PencilIcon } from "../../../../shared/ui/icons";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../shared/ui/input";
import { styles } from "./modal.styles";
import { COLORS } from "../../../../shared/ui/colors";
import { useChangePasswordPartOne, useChangePasswordPartTwo } from "../../../auth/hooks/useChangePasswort";
import { useState } from "react";
import { Result } from "../../../../shared/types/result";
import { ICode } from "../../../auth/types";





export function ChangePasswordModal(props: IChangePasswordModalProps) {
    const { control, handleSubmit } = useForm<IChangePasswordModalForm>({

    })

    const { control: controlPartTwo, handleSubmit: handleSubmitPartTwo } = useForm<ICode>({

    })

    const { changePasswordPartOne } = useChangePasswordPartOne()
    const { changePasswordPartTwo } = useChangePasswordPartTwo();


    const [ modalVariant, setModalVariant ] = useState<'partOne' | 'partTwo'>('partOne');
    const [password, setPassword] = useState<string>('')


    async function onSubmit(data: IChangePasswordModalForm) {
        console.log(data);


        setPassword(data.password)

        const newCode = await changePasswordPartOne();

        setModalVariant('partTwo')

    }

    async function onPartTwoSubmit(data: ICode) {
        
        const verify  = await changePasswordPartTwo(data.code, password)



        props.onClose()
    }


    return (

        <>
            { modalVariant === 'partOne' && <Modal.InCenterWithoutHeader title='Пароль' visible={props.visible} onClose={props.onClose}> 
            <View style={styles.navPassword}>
                <Text style={styles.navPasswordTitle}>Пароль</Text>
                <TouchableOpacity onPress={
                    handleSubmit(onSubmit)
                }>
                    <View style={styles.navPasswordButton}>
                        <PencilIcon width={20} height={20} stroke={COLORS.darkPlum} strokeWidth={0.1}/>
                        <Text style={styles.navPasswordButtonText}>Змінити пароль</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.InputPasswordView}>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <Input.Password
                            label="Новий пароль"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Напишіть новий пароль"
                            onBlur={onBlur}
                            error={error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <Input.Password
                            label="Підтвердіть новий пароль"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Підтвердіть пароль"
                            onBlur={onBlur}
                            error={error?.message}
                        />
                    )}
                />
            </View>
        </Modal.InCenterWithoutHeader>
        }




        { modalVariant === 'partTwo' && 
        <Modal.InCenterWithoutHeader title='Пароль' visible={props.visible} onClose={props.onClose}>
                <Text style={styles.verifyModalTitle}>Підтвердження для зміни паролю</Text>
                <Text style={styles.verifyModalText}>Ми надіслали 6-значний код на вашу пошту (you@example.com). Введіть його нижче, щоб підтвердити акаунт</Text>
                <Controller
                    control={controlPartTwo}
                    name="code"
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <Input.Code
                            label="Підтвердіть новий пароль"
                            value={value}
                            onChangeText={onChange}
                            // placeholder="Напишіть підтвердження нового паролю"
                            onBlur={onBlur}
                            error={error?.message}
                        />
                    )}
                />

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <TouchableOpacity onPress={props.onClose} style={styles.dismissButton}>
                        <Text style={styles.dismissButtonTitle}>Скасувати</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmitPartTwo(onPartTwoSubmit)} style={styles.createButton}>
                        <Text style={styles.createButtonTitle}>Зберегти</Text>
                    </TouchableOpacity>
                </View>
        </Modal.InCenterWithoutHeader>
        }
        </>
    )
}