import { StatusBar } from 'expo-status-bar';
import { Providers } from './providers';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    return (
        <Providers>
            <SafeAreaView> 
                <StatusBar style="auto" />
            </SafeAreaView>
        </Providers>
    )
}