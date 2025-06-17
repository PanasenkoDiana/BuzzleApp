import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/ui/colors";


export const styles = StyleSheet.create({
    myPhotoView: {
        width: 200,
        height: 200,
        // backgroundColor: '#000',
        borderRadius: 10,
    },

    myPhotoImage: {
        width: 200,
        height: 200,
        borderRadius: 20,
    },

    myPhotoButtonsView: {
        gap: 10,
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
        margin: 10,
        bottom: 0,
    },

    myPhotoSmallView: {
        width: 160,
        height: 160,
        borderRadius: 10,
    },

    myPhotoSmallImage: {
        width: 160,
        height: 160,
        borderRadius: 10,
    },

    myPhotoASmallAddView:{
        width: 160,
        height: 160,
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius:10,
        alignItems: 'center',
        borderStyle: 'dashed',
        justifyContent: 'center',
    }
})