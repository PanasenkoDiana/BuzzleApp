import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/ui/colors';


export const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        minHeight: '100%',
        backgroundColor: COLORS.white,
        padding: 5,
        borderWidth: 2,
        borderColor: COLORS.lightGray,
        borderRadius: 15,

    },
});
