import { TouchableOpacity, View } from 'react-native'
import { styles } from './header.styles'
import { LogoImage } from '../images'
import { LogoutIcon, PlusIcon, SettingsIcon } from '../icons'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../../modules/auth/context/userContext';

export function Header(){
    const { user, setUser } = useUserContext(); 

    const handleLogout = () => {
        setUser(null);
        AsyncStorage.removeItem("token"); 
        router.push('/login')
    };

    return(
        <View style={styles.container}>
            <LogoImage style={styles.logo}/>

            <View style={styles.othersNav}>
                <View style={styles.navDiv}>
                    <TouchableOpacity style={styles.navIcon}><PlusIcon style={styles.navIcon}></PlusIcon></TouchableOpacity>
                </View>
                <View style={styles.navDiv}>
                    <TouchableOpacity style={styles.navIcon}><SettingsIcon style={styles.navIcon}></SettingsIcon></TouchableOpacity>
                </View>
                <View style={styles.navDiv}>
                    <TouchableOpacity style={styles.navIcon} onPress={()=>handleLogout()}><LogoutIcon style={styles.navIcon}></LogoutIcon></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}