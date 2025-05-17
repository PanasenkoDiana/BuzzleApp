import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/ui/colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.white,
        // borderWidth: 2,
        // borderColor: COLORS.lightGray,
		// borderRadius: 15,
        // padding: 10,
        // gap: 10
    },
    bottomContainer: {
        // flex: 1,
        width: '100%', 
        justifyContent: 'flex-end',
        flexDirection: 'row',

        // marginTop: 30,
        gap: 10,
    },
    optionDiv: {
        width: 40,
        height: 40,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionIcon: {
        width: 20,
        height: 20
    },
    submitButton: {
        height: 40,
        backgroundColor: COLORS.darkPlum,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        gap: 4,
    },
    submitButtonText: {
        fontWeight: '500',
        fontSize: 14,
        fontFamily: "GTWalsheimPro-Regular",
        color: COLORS.white,
    },
});