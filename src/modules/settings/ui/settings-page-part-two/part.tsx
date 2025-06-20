import { Controller, useForm } from "react-hook-form"
import { ITextDataForm } from "./part.types"
import { View, Text } from "react-native"
import { SettingsChangeHeader } from "../settings-change-header"
import { Input } from "../../../../shared/ui/input"
import { useUserContext } from "../../../auth/context/userContext"
import { styles } from "./part.styles"
import { useEffect, useState } from "react"
import { IChangeUserPartTwo } from "../../../auth/types"
import { IconButton } from "../../../../shared/ui/icon-button"
import { PencilIcon } from "../../../../shared/ui/icons"
import { COLORS } from "../../../../shared/ui/colors"
import { ChangePasswordModal } from '../change-password-modal'
 
export function SettingsPagePartTwo() {
	const { user, changeUserPartTwo } = useUserContext()
	const { handleSubmit, control } = useForm<IChangeUserPartTwo>()
	const [ isRedact, setIsRedact ] = useState(false)
	const [ isPasswordChangeModal, setIsPasswordChangeModal ] = useState(false)
	const { fetchUser } = useUserContext();

	async function onSubmit(data: IChangeUserPartTwo) {
		if (data.password !== data.repeatPassword) {
			console.error("Passwords do not match")
			return
		}
		console.log("data: " + data)

		if (!user) return
		const response = changeUserPartTwo(data)
		fetchUser();
		console.log("Response:" + response)
	}

	useEffect(() => {
		const submitIfNeeded = async () => {
			if (!isRedact){
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
							defaultValue={user?.name}
							onBlur={onBlur}
							error={error?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="surname"
					render={({
						field: { value, onChange, onBlur },
						fieldState: { error },
					}) => (
						<Input.Password
							label="Прізвище"
							value={value}
							onChangeText={onChange}
							disabled={isRedact ? false : true}
							placeholder="Прізвище"
							defaultValue={user?.surname}
							onBlur={onBlur}
							error={error?.message}
						/>
					)}
				/>
				<Input.Password
					label="Дата народження"
					// value={value}
					// onChangeText={onChange}
					disabled={isRedact ? false : true}
					placeholder="Дата народження"
					defaultValue={`${Date.now()}`}
					// onBlur={onBlur}
					// error={error?.message}
				/>


				<View style={styles.PasswordChangeBlock}>
					<Text style={styles.PasswordChangeTitle}>Пароль</Text>

					<IconButton icon={<PencilIcon width={20} height={20} fill={COLORS.darkPlum} />} onPress={()=> setIsPasswordChangeModal(!isPasswordChangeModal)}/>
				</View>
				
				{ isPasswordChangeModal && 
					<ChangePasswordModal visible={isPasswordChangeModal} onClose={()=>setIsPasswordChangeModal(false)} />
				}

			</View>
		</View>
	)
}
