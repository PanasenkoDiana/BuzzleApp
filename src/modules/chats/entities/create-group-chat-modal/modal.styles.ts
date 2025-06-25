import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/ui/colors";

export const styles = StyleSheet.create({
    title: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 34,
        alignSelf: 'center',
    },
    GroupAvatar: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    },
    AvatarButtons: {
        flexDirection: 'row',
        gap: 20,
    },
    AvatarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    AvatarText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        color: COLORS.darkPlum,
        fontWeight:  '900',
    },
    MembersView: {
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 5,
        padding: 10,
        width: 300,
        flexDirection: 'column',
        alignSelf: 'center',
        gap: 15,
    },
    MembersHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    MembersTitle: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        color: COLORS.darkPlum
    },
    contactCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    contactName: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16,
        color: COLORS.black,
    },
    deleteButton: {
        position: 'absolute',
        right: 0,
    },
    buttonsBlock: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15
    },
    dismissButton: {
        borderColor: COLORS.darkPlum,
        borderWidth: 1,
        borderRadius: 100,
        padding: 10,
    },
    dismissButtonText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 14,
        color: COLORS.darkPlum
    },
    saveButton: {
        backgroundColor: COLORS.darkPlum,
        borderRadius: 100,
        padding: 10,
    },
    saveButtonText: {
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 14,
        color: COLORS.white
    }
});
