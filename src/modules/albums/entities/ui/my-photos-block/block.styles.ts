import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../../shared/ui/colors'



export const styles = StyleSheet.create({
    partView: {
        width: "100%",
		backgroundColor: COLORS.white,
		borderColor: COLORS.lightGray,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 10,
        gap: 15,
        padding: 10,
    },

    partHeader: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    myPhotosTitle: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        fontWeight: '500',
    },

    addPhotoButton: {
        // backgroundColor: '#000',
        borderRadius: 50,
        borderEndColor: COLORS.darkPlum,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 9,
        borderWidth: 1,
        borderColor: COLORS.darkPlum,
        gap: 10,
    },

    addPhotosButtonText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.darkPlum,  
    },

    myPhotosList: {
        width: '100%',
        // padding: 10,
        gap: 10
    },
})