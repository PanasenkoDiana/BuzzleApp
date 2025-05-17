import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/ui/colors';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.lightGray,
		borderRadius: 15,
        padding: 10,
        // justifyContent: 'flex-start',
        // padding: 0,
        // paddingHorizontal: 16,
        // padding: 15,
    },
});