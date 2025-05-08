import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { EmailIcon } from "../../../../shared/ui/icons";
import { styles } from "./form.style";
import { Input } from "../../../../shared/ui/input";
import { ILogin } from "../../types";
import { Button } from "../../../../shared/ui/button";
import { useRouter } from "expo-router";
import { useUserContext } from "../../context/userContext";
import { authUser } from "../../hooks";

export function LoginForm() {
	
	const { control, handleSubmit, setError } = useForm<ILogin>({
		defaultValues: { email: "", password: "" },
	});
	const { login, setUser } = useUserContext();

	const router = useRouter();
	
	async function onSubmit(data: ILogin) {
		router.push("/me");
		const response = await login(data.email, data.password);

		if (response.status === "error") {
			if (response.message === "User not found") {
				setError("email", {
					type: "manual",
					message: "User not found",
				});
			}
			if (response.message === "Incorrect password") {
				setError("password", {
					type: "manual",
					message: "Incorrect password",
				});
			}
			return;
		}

		const user = await authUser.getData(response.data);

		if (user?.status === "success") {
			setUser(user.data);
			router.push("/me");
		} else {
			console.log(user?.message);
		}

		console.log(response.data);
		// router.push("/me");
	}

	return (
		<View style={styles.container}>
			<View>
				<Controller
					control={control}
					name="email"
					rules={{
						required: {
							value: true,
							message: "Email is required",
						},
					}}
					render={({ field, fieldState }) => {
						return (
							<Input
								value={field.value}
								onChangeText={field.onChange}
								onChange={field.onChange}
								placeholder="buzzle@gmail.com"
								label="Email"
								error={fieldState.error?.message}
								leftIcon={<EmailIcon width={36} height={35} />}
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
							message: "Password is required",
						},
					}}
					render={({ field, fieldState }) => {
						return (
							<Input.Password
								value={field.value}
								onChangeText={field.onChange}
								onChange={field.onChange}
								placeholder="password"
								label="Password"
								error={fieldState.error?.message}
							/>
						);
					}}
				/>
			</View>
			<View>
				<Button onPress={handleSubmit(onSubmit)} label="Submit" />
			</View>
		</View>
	);
}
