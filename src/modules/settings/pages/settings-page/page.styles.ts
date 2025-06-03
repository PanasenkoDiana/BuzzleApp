import { StyleSheet } from "react-native"
import { COLORS } from "../../../../shared/ui/colors"

export const styles = StyleSheet.create({

    settingsNav: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10, 
        gap: 10
    },
    settingsSelectedTextNav: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 16,
        fontWeight: 700,
        color: COLORS.black,
        textDecorationLine: "underline"
    },
    settingsTextNav: {
        fontFamily: 'GTWalsheimPro-Regular',
        fontSize: 16,
        fontWeight: 700,
        color: COLORS.gray,
        // textDecorationLine: "underline"
    },
})
