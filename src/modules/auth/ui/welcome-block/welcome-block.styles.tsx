import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";

export const styles = StyleSheet.create({
    container: {
        // flex: 0.5,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: COLORS.white,
    },
    image:{
        height: 18,
        width: 145
    },
    title: {
        fontSize: 32,
        color: COLORS.black
    }
})