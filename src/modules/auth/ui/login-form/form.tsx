import { View } from 'react-native'
import { Controller, useForm } from "react-hook-form"
import { EmailIcon } from '../../../../shared/ui/icons'
import { styles } from './form.style'
import { Input } from '../../../../shared/ui/input'
import { ILogin } from '../../types'
import { Button } from '../../../../shared/ui/button'

export function LoginForm(){
    const { control, handleSubmit } = useForm<ILogin>()

    function onSubmit(data: ILogin){
        console.log(data)
    }

    return(
        <View style={styles.container}>
            <View>
                <Controller 
                control={control} 
                name='email'
                rules={{
                    required:{
                        value:true,
                        message:"Email is required"
                }}}
                render={
                    ({ field, fieldState })=>{
                        return(
                            <Input 
                            value={field.value} 
                            onChange={field.onChange} 
                            placeholder="buzzle@gmail.com" 
                            label="Email" 
                            error={fieldState.error?.message}
                            leftIcon={<EmailIcon width={36} height={35}/>}/>
                        )
                    }
                }/>

                <Controller control={control} name='password'
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
                            label="Password" 
                            error={fieldState.error?.message}
                            />
                        )
                    }
                }/>
            </View>
            <View>
                <Button onPress={handleSubmit(onSubmit)} label="Submit"/>
            </View>
        </View>
    )
}