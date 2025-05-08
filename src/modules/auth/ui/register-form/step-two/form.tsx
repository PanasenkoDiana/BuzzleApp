import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./form.style";
import { Input } from "../../../../../shared/ui/input";
import { useUserContext } from "../../../context/userContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "../../../../../shared/ui/button";
import { ICode, Result } from "../../../types";

export function VerifyForm() {
    const params = useLocalSearchParams<{email: string}>()
	const { control, handleSubmit, setError } = useForm<ICode>();
    const { register, verify } = useUserContext()
    const router = useRouter();

	async function onSubmit(code: ICode) {
        const response = await verify(params.email, code.code)
        if (!response) {
            setError("code", {
				type: "manual",
				message: "Invalid code",
			});
			return;
        } 
        router.push("/login")
    }

    return (
        <View style={styles.container}>
            <View>
                <Controller
                    control={control}
                    name="code"
                    rules={{
                        required: {
                            value: true,
                            message: "The code was not entered",
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <Input
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                    )}
                />
            </View>
            <View>
                <Button onPress={handleSubmit(onSubmit)} label="Submit" />
            </View>
        </View>
    );   
}
