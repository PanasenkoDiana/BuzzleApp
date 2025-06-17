import { StyleSheet } from "react-native"
import { COLORS } from '../colors'

export const styles = StyleSheet.create({
    container: {
        paddingBottom: 15,
        // position: 'absolute',
        backgroundColor: COLORS.white,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 70,
        bottom: 0,
    },
    navBlock: {
        width: '25%',
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
    },
    selectedBlock: {
        width: "75%",
        height: 2,
        backgroundColor: COLORS.black,
        position: "absolute",
        top: 0,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
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