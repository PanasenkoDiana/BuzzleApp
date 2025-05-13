import { StyleSheet } from "react-native"
import { COLORS } from '../colors'

export const styles = StyleSheet.create({
    container: {
        paddingBottom: 15,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        gap: 10,
    },
    navBlock: {
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    navIcon: {
        width: 20,
        height: 20,
    },
    navText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 14,
        fontWeight: '500',
    },
})