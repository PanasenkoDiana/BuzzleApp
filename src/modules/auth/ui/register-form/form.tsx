import { IRegister } from "../../types"
import { Button } from "../../../../shared/ui/button"
import { Input } from "../../../../shared/ui/input"
import { Controller, useForm } from "react-hook-form"
import { EmailIcon, UserIcon } from "../../../../shared/ui/icons"
import { View } from "react-native"
import { styles } from "./form.style"


export function RegisterForm(){


    const { control, handleSubmit } = useForm<IRegister>()

    function onSubmit(data: IRegister){
        console.log(data)
    }

    return (
        <View style={styles.container}>
            <View>
                <Controller
                control={control}

                name='username'

                rules={{
                    required:{
                        value:true,
                        message:"Username is required"
                }}}

                render={
                    ({field, fieldState})=>{
                        return(
                            <Input
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Username"
                            label="Username"
                            error={fieldState.error?.message}
                            leftIcon={<UserIcon width={36} height={35} />}
                            />
                        )
                    }
                }
                />

                <Controller
                control={control}

                name='email'

                rules={{
                    required:{
                        value:true,
                        message:"Email is required"
                }}}

                render={
                    ({field, fieldState})=>{
                        return(
                            <Input
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="buzzle@gmail.com"
                            label="Email"
                            error={fieldState.error?.message}
                            leftIcon={<EmailIcon width={36} height={35} />}
                            />
                        )
                    }
                }
                />

                <Controller 
                control={control} 
                
                name='password'

                rules={{
                    required:{
                        value:true,
                        message:"Password is required"
                }}}
                render={
                    ({ field, fieldState })=>{
                        return(
                            <Input.Password value={field.value} 
                            onChange={field.onChange} 
                            placeholder="password" 
                            label="password" 
                            error={fieldState.error?.message}
                            />
                        )
                    }
                }/>

                <Controller control={control} name='repeatPassword'
                rules={{
                    required:{
                        value:true,
                        message:"Repeat password is required"
                }}}
                render={
                    ({ field, fieldState })=>{
                        return(
                            <Input.Password value={field.value} 
                            onChange={field.onChange} 
                            placeholder="Repeat password" 
                            label="Repeat password" 
                            error={fieldState.error?.message}
                            />
                        )
                    }
                }/>
            </View>
            <View>
                <Button onPress={handleSubmit(onSubmit)} label="Submit" />
            </View>
        </View>
    )
}