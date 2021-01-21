import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    imageBackground: {
        // flex: 1,
        width: '100%',
        height: 250,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    infoContainer: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        textShadowColor: '#000',
        color: '#fff'
    },
    subtitle: {
        fontSize: 18,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        textShadowColor: '#000',
        color: '#fff'
    },
    icon: {
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 2,
        top: 200,
        right: 25,

        backgroundColor: '#517fa4',
        borderRadius: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    triangle: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: Dimensions.get('window').width,
        borderRightWidth: 0,
        borderBottomWidth: 30,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff',
    }
});