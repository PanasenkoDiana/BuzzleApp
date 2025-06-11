import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native"
import { useUserContext } from "../../../auth/context/userContext"
import { styles } from "./page.styles"
import { SettingsChangeHeader } from "../../ui/settings-change-header"
import { SettingsPagePartOne } from "../../ui/settings-page-part-one"
import { SettingsPagePartTwo } from "../../ui/settings-page-part-two/part"
import { SettingsPagePartThree } from "../../ui/settings-page-part-three"
import { SettingsHeader } from "../../ui/settings-header/header"

export function Settings() {
	const { user } = useUserContext()

	return (
		// <ScrollView contentContainerStyle={{ flex: 1 }}>
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{ paddingVertical: 10 }}
		>
			<SettingsHeader selectedPage={'settings'} />
			<View style={{ flex: 1, gap: 15 }}>

				<SettingsPagePartOne />

				<SettingsPagePartTwo />

				<SettingsPagePartThree />
			</View>
		</ScrollView>

		// </ScrollView>
	)
}
