import { View, Text } from 'react-native'
import { HomeIcon, GalleryIcon, PeopleIcon, ChatIcon } from '../icons'
import { styles } from './footer.styles'

export function Footer() {


    return(
        <View style={styles.container} >
            <View style={styles.navBlock}>
                <HomeIcon style={styles.navIcon} />
                <Text style={styles.navText}>Головна</Text>
            </View>
            <View style={styles.navBlock}>
                <GalleryIcon style={styles.navIcon} />
                <Text style={styles.navText}>Мої публікації</Text>
            </View>
            <View style={styles.navBlock}>
                <PeopleIcon style={styles.navIcon} />
                <Text style={styles.navText}>Друзі</Text>
            </View>
            <View style={styles.navBlock}>
                <ChatIcon style={styles.navIcon} />
                <Text style={styles.navText}>Чати</Text>
            </View>
        </View>
    )
}