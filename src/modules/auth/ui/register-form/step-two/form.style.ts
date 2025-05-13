import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../../shared/ui/colors'

export const styles = StyleSheet.create({
    container: {
        flex: 0.75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: '90%',
        gap: 20,
        backgroundColor: COLORS.white,
    },
    inputBox: {
        height: 60,
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 16,
        backgroundColor: COLORS.white,
    },
    buttonsContainer: {
        justifyContent: 'center',
        gap: 10,
    },

    backButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton:{
        fontWeight: '700',
        fontSize: 16,
        fontFamily: "GTWalsheimPro-Regular",
        color: COLORS.darkPlum,
    },

})