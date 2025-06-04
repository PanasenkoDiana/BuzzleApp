import { ReactNode } from "react"
import { TouchableOpacity, View, Text } from "react-native"
import { styles } from "./FriendsLayout.styles"
import { router } from "expo-router"

interface IFriendsLayout {
    selectedPage: string,
    setSelectedPage: (page: string) => void,
    children: ReactNode
}

export function FriendsLayout(props: IFriendsLayout) {
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => props.setSelectedPage("all")} style={[
                    styles.navButtom,
                    props.selectedPage === 'all' && styles.selectedBlock
                ]}>
                    <Text style={styles.navText}>Всі друзі</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.setSelectedPage("requests")} style={[
                    styles.navButtom,
                    props.selectedPage === 'requests' && styles.selectedBlock
                ]}>
                    <Text style={styles.navText}>Запити</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.setSelectedPage("recommend")} style={[
                    styles.navButtom,
                    props.selectedPage === 'recommend' && styles.selectedBlock
                ]}>
                    <Text style={styles.navText}>Рекомендації</Text>
                </TouchableOpacity>
            </View>
            {props.children}
        </View>
    )
}