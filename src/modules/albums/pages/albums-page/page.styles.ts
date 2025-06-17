import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";

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

    albumsHeaderTitle: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.black,  
    },
    // albumCard: {
    //     backgroundColor: COLORS.white,
    //     marginVertical: 10,
    //     padding: 10,
    //     borderRadius: 12
    // },
    albumTextInfo: {
        paddingBottom: 15,
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    albumTextInfoTheme:{
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.black,  
    },

    albumTextInfoYear:{
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.lightGray,  
    },

    albumPhotosList: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 10,
        width: '100%',
    },

    albumPhotosTitle:{
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.black,  
    },

    myPhotoAddView: {
        
    }

})