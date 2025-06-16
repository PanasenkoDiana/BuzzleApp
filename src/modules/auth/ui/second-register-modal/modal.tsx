import { TouchableOpacity, View, Text } from "react-native"
import { ISecondRegisterForm } from "./modal.types"
import { Controller, useForm } from "react-hook-form"
import { Input } from "../../../../shared/ui/input"
import { styles } from "./modal.styles"
import { useUserContext } from "../../context/userContext"
import { Modalka } from "../../../../shared/ui/modal/modal"

interface ISecondRegisterModalProps {
	isVisible: boolean
	onClose: () => void
}

export function SecondRegisterModal(props: ISecondRegisterModalProps) {
	const { handleSubmit, control } = useForm<ISecondRegisterForm>()
	const { user, addSecondUserInfo } = useUserContext()

	async function onSubmit(data: ISecondRegisterForm) {
		console.log(user)

		if (!user) return
		await addSecondUserInfo(data, user.id)
		props.onClose()	
	}

	return (
		<Modalka.InCenter
			visible={props.isVisible}	
			onClose={props.onClose}
			title="Додай деталі про себе"
		>
				<View
					style={{
                        flexDirection: 'column',
                        gap: '30',

						justifyContent: "center",
						alignContent: "center",
					}}
				>
					<Controller
						control={control}
						name="name"
						rules={{ required: "Напишіть своє ім'я" }}
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<Input
								label="Ім’я"
								value={value}
								onChangeText={onChange}
								placeholder="Введіть Ваше ім’я"
								onBlur={onBlur}
								error={error?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="surname"
						rules={{ required: "Напишіть своє прізвище" }}
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<Input
								label="Прізвище"
								value={value}
								onChangeText={onChange}
								placeholder="Введіть Ваше прізвище"
								onBlur={onBlur}
								error={error?.message}
							/>
						)}
					/>
					<Controller
						control={control}
						name="username"
						rules={{ required: "Напишіть ім'я користувача" }}
						render={({
							field: { value, onChange, onBlur },
							fieldState: { error },
						}) => (
							<Input
								label="Ім’я користувача"
								value={value}
								onChangeText={onChange}
								placeholder="@"
								onBlur={onBlur}
								error={error?.message}
							/>
						)}
					/>

                    <Text style={styles.variantText}>Або оберіть: <Text style={[styles.variantText, {color: "#22C55E"}]}>(Запропоновані варіанти відповідно до Ім’я та Прізвища)</Text></Text>

					<TouchableOpacity
						style={styles.submitButton}
						onPress={handleSubmit(onSubmit)}
					>
						<Text style={styles.submitButtonText}>Продовжити</Text>
					</TouchableOpacity>
				</View>
		</Modalka.InCenter>
	)
}
