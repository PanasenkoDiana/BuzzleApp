import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../shared/ui/colors';


export const styles = StyleSheet.create({
    profileContainer: {
        marginTop: 20,
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    username: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.black,
    },
    signature: {
        fontSize: 16,
        color: COLORS.black,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        color: COLORS.black,
    },
    postDescription: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
        color: COLORS.black,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    gridImage: {
        flex: 1,
        height: 200,
        borderRadius: 12,
    },
    largeImage: {
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 8,
        marginBottom: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statNumber: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black,
        marginLeft: 4,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.gray,
    },
});