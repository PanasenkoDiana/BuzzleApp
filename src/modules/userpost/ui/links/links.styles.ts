import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/ui/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontFamily: "GTWalsheimPro-Regular",
		fontSize: 16,
		color: COLORS.black,
		marginBottom: 5,
		paddingLeft: 5,
		fontWeight: "400",
    },
    linksContainer: {
        gap: 5
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },
    input: {
        flex: 1,  // Это заставит контейнер инпута занимать все доступное пространство
    },
    button: {
        height: 30,
        width: 30,
        borderColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 50,
    }
})