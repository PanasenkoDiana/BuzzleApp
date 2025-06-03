import { Controller, useForm } from "react-hook-form"
import { ITextDataForm } from "./part.types"
import { View } from "react-native"
import { SettingsChangeHeader } from "../settings-change-header"
import { Input } from "../../../../shared/ui/input"
import { useUserContext } from "../../../auth/context/userContext"
import { styles } from "./part.styles"

export function SettingsPagePartTwo() {
	const { user } = useUserContext()
	const { handleSubmit, control } = useForm<ITextDataForm>()

	return (
		<View style={styles.changeSettingsBlock}>
			<SettingsChangeHeader title={"Особиста інформація"} />
			<View>
				<Controller
					control={control}
					name="name"
					render={({
						field: { value, onChange, onBlur },
						fieldState: { error },
					}) => (
						<Input.Password
							label="Ім’я"
							value={value}
							onChangeText={onChange}
							placeholder="Ім'я"
							defaultValue={user?.username}
							onBlur={onBlur}
							error={error?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="name"
					render={({
						field: { value, onChange, onBlur },
						fieldState: { error },
					}) => (
						<Input.Password
							label="Ім’я"
							value={value}
							onChangeText={onChange}
							placeholder="Ім'я"
							defaultValue={user?.username}
							onBlur={onBlur}
							error={error?.message}
						/>
					)}
				/>
				<Input.Password
					label="Ім’я"
					// value={value}
					// onChangeText={onChange}
					placeholder="Ім'я"
					defaultValue={user?.username}
					// onBlur={onBlur}
					// error={error?.message}
				/>
				<Input.Password
					label="Ім’я"
					// value={value}
					// onChangeText={onChange}
					placeholder="Ім'я"
					defaultValue={user?.username}
					// onBlur={onBlur}
					// error={error?.message}
				/>
				<Controller
					control={control}
					name="name"
					render={({
						field: { value, onChange, onBlur },
						fieldState: { error },
					}) => (
						<Input.Password
							label="Ім’я"
							value={value}
							onChangeText={onChange}
							placeholder="Ім'я"
							defaultValue={user?.username}
							onBlur={onBlur}
							error={error?.message}
						/>
					)}
				/>
			</View>
		</View>
	)
}
