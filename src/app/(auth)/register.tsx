import { Link } from 'expo-router'
import { Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WelcomeBlock } from '../../modules/auth/ui'
import { COLORS } from '../../shared/ui/colors'
import { RegisterForm } from '../../modules/auth/ui/register-form'


export default function Register(){
    return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <WelcomeBlock/>
                <RegisterForm/>
                <Text style={{textAlign: 'center'}}>Already have an account? <Link href={'/login'}>Login now</Link>
                </Text>
            </SafeAreaView>
        )
}