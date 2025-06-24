import { View, Text, TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { EmailIcon } from "../../../../shared/ui/icons";
import { styles } from "./form.style";
import { Input } from "../../../../shared/ui/input";
import { ILogin } from "../../types";
import { Button } from "../../../../shared/ui/button";
import { useRouter } from "expo-router";
import { useUserContext } from "../../context/userContext";
import { authUser } from "../../hooks";
import { COLORS } from "../../../../shared/ui/colors";

export function LoginForm() {
	
	const { control, handleSubmit, setError } = useForm<ILogin>({
		defaultValues: { email: "", password: "" },
	});
	const { login, setUser } = useUserContext();

	const router = useRouter();
	
	async function onSubmit(data: ILogin) {
		const response = await login(data.email, data.password);

		if (response.status === "error") {
			if (response.message === "User not found") {
				setError("email", {
					type: "manual",
					message: "Користувача не знайдено",
				});
			}
			if (response.message === "Incorrect password") {
				setError("password", {
					type: "manual",
					message: "Невірний пароль",
				});
			}
			return;
		}

		router.push('main')
		
		// const user = await getData(response.data);

		// if (user?.status === "success") {
		// 	setUser(user.data);
		// 	router.push("/main");
		// } else {
		// 	console.log(user?.message);
		// }
	}

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', gap: 20, justifyContent: 'center', marginBottom: 20}}>
				<TouchableOpacity onPress={() => router.push('/register')} style={{borderBottomColor: COLORS.white, borderBottomWidth: 2}}>
					<Text style={{fontFamily: 'GTWalsheimPro-Regular', fontWeight: '500', fontSize: 24}}>Реєстрація</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{borderBottomWidth: 2, borderBottomColor: COLORS.black}}>
					<Text style={{fontFamily: 'GTWalsheimPro-Regular', fontWeight: '700', fontSize: 24}}>Авторизація</Text>
				</TouchableOpacity>
			</View>
			<Text style={{fontSize: 24, marginBottom: 20, fontFamily: 'GTWalsheimPro-Regular'}}>Раді тебе знову бачити!</Text>
			<View style={{width: "100%", gap: 10}}>
				<Controller
					control={control}
					name="email"
					rules={{
						required: {
							value: true,
							message: "Електронна пошта обов'язкова",
						},
					}}
					render={({ field, fieldState }) => {
						return (
							<Input
								value={field.value}
								onChangeText={field.onChange}
								onChange={field.onChange}
								placeholder="your@gmail.com"
								label="Електронна пошта"
								error={fieldState.error?.message}
							/>
						);
					}}
				/>

				<Controller
					control={control}
					name="password"
					rules={{
						required: {
							value: true,
							message: "Пароль обов'язковий",
						},
					}}
					render={({ field, fieldState }) => {
						return (
							<Input.Password
								value={field.value}
								onChangeText={field.onChange}
								onChange={field.onChange}
								placeholder="Введи пароль"
								label="Пароль"
								error={fieldState.error?.message}
							/>
						);
					}}
				/>
			</View>
			<View>
				<Button onPress={handleSubmit(onSubmit)} label="Увійти" />
			</View>
		</View>
	);
}

