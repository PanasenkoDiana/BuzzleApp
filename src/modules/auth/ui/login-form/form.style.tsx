import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../shared/ui/colors'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        // margin: 20,
        width: '90%',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        paddingHorizontal: 20,
        // padding: 32,
        backgroundColor: COLORS.white,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
})
