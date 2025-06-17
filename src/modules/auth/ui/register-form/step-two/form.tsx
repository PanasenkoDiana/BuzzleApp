import { TouchableOpacity, View, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./form.style";
import { Input } from "../../../../../shared/ui/input";
import { useUserContext } from "../../../context/userContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "../../../../../shared/ui/button";
import { ICode } from "../../../types";
import { COLORS } from "../../../../../shared/ui/colors";

export function VerifyForm() {
	const params = useLocalSearchParams<{ email: string }>();
	const { control, handleSubmit, setError } = useForm<ICode>();
	const { verify } = useUserContext();
	const router = useRouter();

	async function onSubmit(code: ICode) {
		const response = await verify(params.email, code.code);

		if (!response || response.status === "error") {
			setError("code", {
				type: "manual",
				message: response?.message || "Неправильний код",
			});
			return;
		}

		router.push({
			pathname: "/main",
			params: {
				showRegisterModal: "true",
			},
		});
	}

	return (
		<View style={styles.container}>
			<View style={{ width: "100%", alignItems: "center" }}>
				<Text
					style={{
						fontFamily: "GTWalsheimPro-Regular",
						fontSize: 24,
						fontWeight: "700",
						color: COLORS.darkPlum,
					}}
				>
					Підтвердження пошти
				</Text>
			</View>

			<View style={{ alignItems: "center", width: "100%" }}>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "600",
						fontFamily: "GTWalsheimPro-Regular",
						color: COLORS.darkPlum,
						textAlign: "center",
					}}
				>
					Ми надіслали 6-значний код на вашу пошту (you@example.com).
					Введіть його нижче, щоб підтвердити акаунт
				</Text>
			</View>

			<View>
				<Controller
					control={control}
					name="code"
					rules={{
						required: {
							value: true,
							message: "Код не введенний",
						},
						minLength: {
							value: 6,
							message: "Має бути 6 цифр",
						},
					}}
					render={({
						field: { value, onChange, onBlur },
						fieldState: { error },
					}) => (
						<Input.Code
							label="Код підтвердження"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							error={error?.message}
						/>
					)}
				/>
			</View>

			<View>
				<Button onPress={handleSubmit(onSubmit)} label="Підтвердити" />
				<TouchableOpacity
					style={styles.backButtonContainer}
					onPress={() => router.back()}
				>
					<Text style={styles.backButton}>Назад</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
