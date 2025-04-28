import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


export function Providers({children}: {children: ReactNode}){
    return (
        <SafeAreaProvider>
            {children}
        </SafeAreaProvider>
    )
}