import { Controller, useForm } from "react-hook-form"
import { ITextDataForm } from "./part.types"
import { View } from "react-native"
import { SettingsChangeHeader } from "../settings-change-header"
import { Input } from "../../../../shared/ui/input"
import { useUserContext } from "../../../auth/context/userContext"
import { styles } from "./part.styles"
import { useEffect, useState } from "react"
import { COLORS } from "../../../../shared/ui/colors"
import { IChangeUserPartTwo } from "../../../auth/types"

export function SettingsPagePartTwo() {
	const { user, changeUserPartTwo } = useUserContext()
	const { handleSubmit, control } = useForm<IChangeUserPartTwo>()
	const [ isRedact, setIsRedact ] = useState(false)

	async function onSubmit(data: IChangeUserPartTwo) {
		const response = changeUserPartTwo(data)
		console.log(response)
	}

	useEffect(() => {
		const submitIfNeeded = async () => {
			if (isRedact){
				handleSubmit(onSubmit)()
			}
		}

		submitIfNeeded()
	}, [isRedact])

	return (
		<View style={[styles.changeSettingsBlock]}>
			<SettingsChangeHeader title={"Особиста інформація"} onRedact={()=>setIsRedact(!isRedact)} />
			<View pointerEvents={isRedact ? 'auto' : 'none'} >
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
							disabled={isRedact ? false : true}
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
							disabled={isRedact ? false : true}
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
					disabled={isRedact ? false : true}
					placeholder="Ім'я"
					defaultValue={user?.username}
					// onBlur={onBlur}
					// error={error?.message}
				/>
				<Input.Password
					label="Ім’я"
					disabled={isRedact ? false : true}
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
							disabled={isRedact ? false : true}
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
