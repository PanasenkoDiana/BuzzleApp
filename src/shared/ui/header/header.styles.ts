import { StyleSheet } from "react-native"
import { COLORS } from '../colors'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: 60,
        padding: 8,
        // paddingBottom: 15,
        // position: 'absolute',
    },
    logo: {
        width: 145,
        height: 18,
    },
    othersNav: {
        gap: 5,
        flexDirection: 'row',
    },
    navDiv: {
        width: 40,
        height: 40,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navIcon: {
        width: 20,
        height: 20,
    },
})