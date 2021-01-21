import { StyleSheet, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    $underlayColor: '$border',
    card: {
        padding: 0,
        margin: 0,
        marginHorizontal: 15,
        width: 160,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        shadowColor: 'transparent',
        elevation: 0
    },
    text: {
        fontSize: 15,
        color: 'white',
        fontWeight: '600',
        alignSelf: 'center',
        // marginTop: 8,
    }
});