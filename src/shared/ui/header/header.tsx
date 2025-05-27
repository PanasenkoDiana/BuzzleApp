import { TouchableOpacity, View, Text } from 'react-native'
import { styles } from './header.styles'
import { LogoImage } from '../images'
import { LogoutIcon, PlusIcon, SettingsIcon } from '../icons'
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../../modules/auth/context/userContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from '../modal';
import { useState } from 'react';
import { Input } from "../input"
import { useForm } from 'react-hook-form';
import { CreatePostModal } from '../../../modules/userpost/ui/create-post-modal/modal';
// import { useAllPosts } from '../../../modules/userpost/hooks/useAllPosts';

export function Header(){
    const { user, setUser } = useUserContext(); 
    const [modalVisible, setModalVisible] = useState(false);

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
                        <TouchableOpacity style={styles.navIcon} onPress={() => {setModalVisible(true)}} ><PlusIcon style={styles.navIcon}></PlusIcon></TouchableOpacity>
                    </View>
                    <View style={styles.navDiv}>
                        <TouchableOpacity style={styles.navIcon}><SettingsIcon style={styles.navIcon}></SettingsIcon></TouchableOpacity>
                    </View>
                    <View style={styles.navDiv}>
                        <TouchableOpacity style={styles.navIcon} onPress={()=>handleLogout()}><LogoutIcon style={styles.navIcon}></LogoutIcon></TouchableOpacity>
                    </View>
                </View>

                <CreatePostModal isVisible={modalVisible} onClose={()=> setModalVisible(false)} />
                {/* <Modal
					title="Створиння публікації"
					visible={modalVisible}
					onClose={() => setModalVisible(false)}
				>
					{/* <Text style={{ color: "black", fontSize: 16 }}>Це модалка</Text> 
                    <Input label='Назва публікації' />
				</Modal> */}
            </View>
    )
}