import { View, Text, TouchableOpacity } from 'react-native'
import { HomeIcon, GalleryIcon, PeopleIcon, ChatIcon } from '../icons'
import { styles } from './footer.styles'
import { router } from 'expo-router'

interface IFooterProps {
    selectedPage: string
}

export function Footer({selectedPage}: IFooterProps) {


    return(
        <View style={styles.container} >
            <TouchableOpacity onPress={()=>router.push('/main')}   style={[
                styles.navBlock,
                selectedPage === 'Home' && styles.selectedBlock
            ]}>
                <HomeIcon style={styles.navIcon } />
                <Text style={styles.navText}>Головна</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push('/userPost')}  style={[
                styles.navBlock,
                selectedPage === 'myPosts' && styles.selectedBlock
            ]}>
                <GalleryIcon style={styles.navIcon} />
                <Text style={styles.navText}>Мої публікації</Text>
            </TouchableOpacity>
            <View style={[
                styles.navBlock,
                selectedPage === 'Friends' && styles.selectedBlock
            ]}>
                <PeopleIcon style={styles.navIcon} />
                <Text style={styles.navText}>Друзі</Text>
            </View>
            <View style={[
                styles.navBlock,
                selectedPage === 'Chats' && styles.selectedBlock
            ]}>
                <ChatIcon style={styles.navIcon} />
                <Text style={styles.navText}>Чати</Text>
            </View>
        </View>
    )
}