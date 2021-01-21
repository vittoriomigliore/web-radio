import { StyleSheet, Platform, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

var { height, width } = Dimensions.get('window');

export default EStyleSheet.create({
    headerContainer: {
        height: 52,
        paddingTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    headerButton: {
        opacity: 0.72,
        fontSize: 30
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold',
        fontSize: 10,
        alignSelf: 'center'
    },
    playerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: 'rgba(22,28,37,1)'
    },
    imageBackgroundContainer: {
        flex: 1,
    },
    imageBackground: {
        width: '100%',
        height: '130%',
        opacity: 0.3
    },
    coverContainer: {
        flex: 4,
    },
    cover: {
        margin: 0,
        alignSelf: 'center',
        width: width - 70,
        height: width - 70
    },
    infoContainer: {
        flex: 1,
        width: width,
        justifyContent: 'space-between',
        // paddingVertical: 20,
    },
    titleContainer: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 4
    },
    artist: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 4,
    },
    seekbarContainer: {
        flex: 0.5,
        width: width,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    progress: {
        height: 2,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        backgroundColor: '#3c3d41'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 42
    },
    playContainer: {
        // width: 80,
        // height: 80,
        // borderRadius: 40,
        // borderColor: 'white',
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    play: {
        color: 'white',
        backgroundColor: 'transparent',
        // margin: 16,
        fontSize: 40,
        fontWeight: '800'
    },
    animationContainer: {
        flex: 1.5,
        width: width,
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: 0
    },
    audioElement: {
        height: 0,
        width: 0,
    }
})