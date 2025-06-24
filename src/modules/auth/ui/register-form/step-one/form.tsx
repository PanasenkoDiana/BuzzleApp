import { IRegister } from "../../../types";
import { Button } from "../../../../../shared/ui/button";
import { Input } from "../../../../../shared/ui/input";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./form.style";
import { useRouter } from "expo-router";
import { useUserContext } from "../../../context/userContext";

export function RegisterForm() {
	const router = useRouter();
	const { register } = useUserContext();

	const { control, handleSubmit, setError } = useForm<IRegister>({
		defaultValues: {	
			email: "",
			password: "",
			repeatPassword: "",
		},
	});

	async function onSubmit(data: IRegister) {
		const gmailRegex = /^[^\s@]+@gmail\.com$/;

		if (data.password !== data.repeatPassword) {
			setError("repeatPassword", {
				type: "manual",
				message: "Паролі не співпадають",
			});
			setError("password", {
				type: "manual",
				message: "Паролі не співпадають",
			});
			return;
		}

		if (!gmailRegex.test(data.email)) {
			setError("email", {
				type: "manual",
				message: "Неправильна пошта (повинно бути @gmail.com)",
			});
			return;
		}

		const response = await register(
			data.email,
			// data.,
			data.password
		);

		if (!response || response.status === "error") {
			setError("email", {
				type: "manual",
				message: response?.message || "Помилка при реєстрації",
			});
			return;
		}
		router.push({
			pathname: "/verify",
			params: {
				email: data.email,
			},
		});
	}

	return (
		<View style={styles.container}>
			<View style={styles.transitionContainer}>
				<TouchableOpacity style={styles.activeTransitionText}>
					<Text style={styles.activeTransitionButton}>
						Реєстрація
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => router.push("/login")}
					style={styles.transitionButton}
				>
					<Text style={styles.transitionText}>Авторизація</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.pageText}>Приєднуйся до World IT</Text>
			<View style={{ width: "100%", gap: 20, paddingHorizontal: 20 }}>
				<View style={{ gap: 10 }}>
					<Controller
						control={control}
						name="email"
						rules={{
							required: {
								value: true,
								message: "Пошта обов'язкова",
							},
							maxLength: {
								value: 35,
								message:
									"Пошта повинна бути не більше 35 символів",
							},
							minLength: {
								value: 3,
								message:
									"Пошта повинна бути не менше 3 символів",
							},
						}}
						render={({ field, fieldState }) => (
							<Input
								value={field.value}
								onChangeText={field.onChange}
								placeholder="your@gmail.com"
								label="Електронна пошта"
								error={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						rules={{
							required: {
								value: true,
								message: "Пароль обов'язковий",
							},
							maxLength: {
								value: 20,
								message:
									"Пароль повинен бути не більше 20 символів",
							},
							minLength: {
								value: 3,
								message:
									"Пароль повинен бути не менше 3 символів",
							},
						}}
						render={({ field, fieldState }) => (
							<Input.Password
								value={field.value}
								onChangeText={field.onChange}
								placeholder="Введи пароль"
								label="Пароль"
								error={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="repeatPassword"
						rules={{
							required: {
								value: true,
								message: "Підтверження паролю обов'язкове",
							},
						}}
						render={({ field, fieldState }) => (
							<Input.Password
								value={field.value}
								onChangeText={field.onChange}
								placeholder="Повтори пароль"
								label="Підтверди пароль"
								error={fieldState.error?.message}
							/>
						)}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						onPress={handleSubmit(onSubmit)}
						label="Створити акаунт"
					/>
				</View>
			</View>
		</View>
	);
}
