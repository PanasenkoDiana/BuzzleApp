import { StyleSheet } from "react-native"
import { COLORS } from '../colors'

export const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.lightGray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        padding: 8,
        paddingBottom: 15,
    },
    logo: {
        width: 180,
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