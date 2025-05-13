import {View,Image,StyleSheet} from "react-native";
import { Header } from "../shared/ui/header";
import { Footer } from "../shared/ui/footer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainPage(){

    return(
        <SafeAreaView style={styles.container}>
            <Header></Header>
            <Image source={require('../../assets/main.png')}style={styles.image}/>
            <Footer></Footer>    
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,

        alignContent: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    image:{
        width:'100%',
        // flex: 0.5,
        height:'85%',
    }




});
// import { View } from "react-native";
// import { Header } from "../shared/ui/header";
// import { COLORS } from "../shared/ui/colors";





// export default function MainPage(){

//     return(
//         <View style={{flex: 1, backgroundColor: COLORS.white}}>
//             <Header></Header>
//         </View>
//     )
// }