import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./main.styles"
import { COLORS } from "../../../shared/ui/colors"
import { useUserContext } from "../../auth/context/userContext"
import { SERVER_HOST } from "../../../shared/constants"

export function Main() {
	const { user } = useUserContext()

	if (!user) return null

	return (
		<View style={styles.container}>
			<View style={styles.profileSection}>
				<Image
					source={{ uri: `${SERVER_HOST}media/${user.profileImage}` }}
					style={styles.avatar}
				/>
				<Text style={styles.fullName}>
					{user.name} {user.surname}
				</Text>
				<Text style={styles.username}>@{user.username}</Text>

				<View style={styles.statsContainer}>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>0</Text>
						<Text style={styles.statLabel}>дописи</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>0</Text>
						<Text style={styles.statLabel}>читачі</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>0</Text>
						<Text style={styles.statLabel}>друзі</Text>
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[styles.button, styles.confirmButton]}
					>
						<Text style={styles.buttonText}>Підтвердити</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.deleteButton]}
					>
						<Text
							style={[styles.buttonText, styles.deleteButtonText]}
						>
							Видалити
						</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.albumButton}>
					<Ionicons
						name="images-outline"
						size={24}
						color={COLORS.black}
					/>
					<Text style={styles.albumButtonText}>
						Переглянути альбом
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
