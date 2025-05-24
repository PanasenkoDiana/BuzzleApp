import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/ui/colors';


export const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        // flex:1,
        width: "90%",
        paddingVertical: 10,
        // height: 45,
        // backgroundColor: COLORS.black
    },
    labelText: {
        fontFamily: "GTWalsheimPro-Regular",
		fontSize: 16,
		color: COLORS.black,
		marginBottom: 5,
		paddingLeft: 5,
		fontWeight: "400",
    },
    allTags: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        gap: 5,
        width: '100%',
        flexWrap: 'wrap',
        // flex:1
    },
    addButton: {
        height: 30,
        width: 30,
        borderColor: COLORS.black,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 2,
        borderRadius: 50,
        // align
    },
    addButtonText: {
        fontWeight: '500',
        fontSize: 25,
        alignSelf: 'center',
        alignContent: 'center',
        fontFamily: "GTWalsheimPro-Regular",
        color: COLORS.black,
    },
    tag: {
        padding: 6,
        height: 28,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 7,
        backgroundColor: COLORS.plum,
        // borderColor: COLORS.lightGray,
        // borderWidth: 2,
        borderRadius: 10,
    },
    tagText: {
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: 14,
        fontFamily: "GTWalsheimPro-Regular",
        color: COLORS.darkPlum,
    },
    tagDeleteButton: {
        borderColor: COLORS.error,
        borderRadius: 30,
        borderWidth: 2,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagDeleteButtonText: {
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: 14,
        fontFamily: "GTWalsheimPro-Regular",
        color: COLORS.error,
    }
})