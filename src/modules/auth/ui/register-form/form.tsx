import { IRegister } from "../../types"
import { Button } from "../../../../shared/ui/button"
import { Input } from "../../../../shared/ui/input"
import { Controller, useForm } from "react-hook-form"
import { EmailIcon, UserIcon } from "../../../../shared/ui/icons"
import { View } from "react-native"
import { styles } from "./form.style"
import { authUser } from "../../hooks"

export function RegisterForm() {
    const { control, handleSubmit, setError } = useForm<IRegister>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            repeatPassword: ''
        }
    })

    function onSubmit(data: IRegister) {
        const gmailRegex = /^[^\s@]+@gmail\.com$/;

        if (data.password !== data.repeatPassword) {
            setError('repeatPassword', {
                type: 'manual',
                message: 'Passwords do not match'
            })
            return
        }

        if (!gmailRegex.test(data.email)) {
            setError('email', {
                type: 'manual',
                message: 'Invalid email address (must be @gmail.com)'
            })
            return
        }

        authUser.register(data.email, data.username, data.password)
    }

    return (
        <View style={styles.container}>
            <View>
                <Controller
                    control={control}
                    name='username'
                    rules={{
                        required: {
                            value: true,
                            message: "Username is required"
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <Input
                            value={field.value}
                            onChangeText={field.onChange}
                            placeholder="Username"
                            label="Username"
                            error={fieldState.error?.message}
                            leftIcon={<UserIcon width={36} height={35} />}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='email'
                    rules={{
                        required: {
                            value: true,
                            message: "Email is required"
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <Input
                            value={field.value}
                            onChangeText={field.onChange}
                            placeholder="buzzle@gmail.com"
                            label="Email"
                            error={fieldState.error?.message}
                            leftIcon={<EmailIcon width={36} height={35} />}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='password'
                    rules={{
                        required: {
                            value: true,
                            message: "Password is required"
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <Input.Password
                            value={field.value}
                            onChangeText={field.onChange}
                            placeholder="password"
                            label="password"
                            error={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='repeatPassword'
                    rules={{
                        required: {
                            value: true,
                            message: "Repeat password is required"
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <Input.Password
                            value={field.value}
                            onChangeText={field.onChange}
                            placeholder="Repeat password"
                            label="Repeat password"
                            error={fieldState.error?.message}
                        />
                    )}
                />
            </View>

            <View>
                <Button onPress={handleSubmit(onSubmit)} label="Submit" />
            </View>
        </View>
    )
}
