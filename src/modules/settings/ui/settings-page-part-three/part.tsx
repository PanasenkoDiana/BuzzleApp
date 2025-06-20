import { View, Text } from "react-native";
import { SettingsChangeHeader } from "../settings-change-header";
import { styles } from "./part.styles";
import { CustomCheckBox } from "../../../../shared/ui/custom-check-box";
import { useState } from "react";

export function SettingsPagePartThree() {
	const [nameChecked, setNameChecked] = useState(true);
	const [signature, setSignature] = useState(true);
	const [isRedact, setIsRedact] = useState(false);

	return (
		<View style={styles.container}>
			<SettingsChangeHeader
				title={"Варіанти підпису"}
				onRedact={() => setIsRedact(!isRedact)}
			/>
			<View style={styles.checkBoxView}>
				<CustomCheckBox
					checked={nameChecked}
					onToggle={() => setNameChecked(!nameChecked)}
					label="Ім’я та прізвище"
				></CustomCheckBox>
				<Text style={styles.nameCheckBoxText}>Name Surname</Text>
			</View>
			<View style={styles.checkBoxView}>
				<CustomCheckBox
					checked={signature}
					onToggle={() => setNameChecked(!signature)}
					label="Мій електронний підпис"
				></CustomCheckBox>
				<View style={styles.signatureView}>
					{/* <Image style={styles.signatureImage} source={{u}} /> */}
				</View>
			</View>
		</View>
	);
}
