import { View } from 'react-native'
import { Controller, useForm } from "react-hook-form"
import { EmailIcon } from '../../../../shared/ui/icons'
import { styles } from './form.style'
import { Input } from '../../../../shared/ui/input'
import { ILogin } from '../../types'
import { Button } from '../../../../shared/ui/button'
import { authUser } from '../../hooks'
import { useRouter } from 'expo-router'
import { Response } from '../../types'

export function LoginForm(){
    const { control, handleSubmit, setError} = useForm<ILogin>({defaultValues: {email: '', password: ''}})

    const router = useRouter()

    async function onSubmit(data: ILogin){
        const response = authUser.login(data.email, data.password)
        
        // const response: Response<string> = await authUser.login(data.email, data.password)

        // if (!response) {
        //     setError('password', {
        //         type: 'manual',
        //         message: 'Incorrect email or password'
        //     })
        //     return
        // }

        router.push('/me')
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
                            onChangeText={field.onChange} 
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
                            onChangeText={field.onChange} 
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