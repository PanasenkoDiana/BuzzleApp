import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native"
import { useUserContext } from "../../../auth/context/userContext"
import { styles } from "./page.styles"
import { SettingsChangeHeader } from "../../ui/settings-change-header"
import { SettingsPagePartOne } from "../../ui/settings-page-part-one"
import { SettingsPagePartTwo } from "../../ui/settings-page-part-two/part"
import { SettingsPagePartThree } from "../../ui/settings-page-part-three"

export function Settings() {
	const { user } = useUserContext()

	return (
		// <ScrollView contentContainerStyle={{ flex: 1 }}>
		<ScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{ paddingVertical: 10 }}
		>
			<View style={{ flex: 1, gap: 15 }}>
				<View style={styles.settingsNav}>
					<Text style={styles.settingsSelectedTextNav}>Особиста інформація</Text>
					<Text style={styles.settingsTextNav}>Альбоми</Text>
				</View>

				<SettingsPagePartOne />

				<SettingsPagePartTwo />

				<SettingsPagePartThree />
			</View>
		</ScrollView>

		// </ScrollView>
	)
}
