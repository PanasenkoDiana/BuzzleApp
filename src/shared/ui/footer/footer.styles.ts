import { StyleSheet } from "react-native"
import { COLORS } from '../colors'

export const styles = StyleSheet.create({
    container: {
        paddingBottom: 15,
        // position: 'absolute',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 70,
        gap: 10,
        bottom: 0,
    },
    navBlock: {
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,

    },

    selectedBlock: {
        borderTopColor: COLORS.darkPlum,
        borderTopWidth: 2,
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