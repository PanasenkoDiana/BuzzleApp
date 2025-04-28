import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        height: 88,
        width: 154
    },
    title: {
        fontSize: 32,
        color: COLORS.black
    }
})