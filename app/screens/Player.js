import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import { connectAlert } from 'components/Alert';
import { Container } from 'components/Container';
import { Header, Cover, Info, Controls, SeekBar, styles } from 'components/Player';

import { load, play, pause, back30, forward30, seek, getLiveImage, getLiveText } from 'actions/player'

import config from 'config/config';

class Player extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        track: PropTypes.object,
        isPlaying: PropTypes.bool
    };

    didFocusListener = null;

    constructor(props) {
        super(props);
        /*  
        *   When didFocus event is dispatched by navigation,
        *   play,
        *   if navigation param isLive, set live stream
        */
        didFocusListener = this.props.navigation.addListener(
            'didFocus',
            payload => {
                if (payload.state.params && payload.state.params.isLive) {
                    const track = {
                        id: '0',
                        url: config.live_track.url,
                        isLive: true
                    }
                    this.props.dispatch(load(track));
                    /*  Set text and image  */
                    this.props.dispatch(getLiveText(null));
                    this.props.dispatch(getLiveImage((new Date).getTime()));
                    /*  Update text and image every interval  */
                    this.interval = setInterval(() => {
                        if (this.props.track.isLive) {
                            this.props.dispatch(getLiveText(null));
                            this.props.dispatch(getLiveImage((new Date).getTime()));
                        }
                    }, config.live_track.interval);
                }
                /*      Play when screen is focused    */
                this.props.dispatch(play());
            }
        );
    }

    handleClosePress = () => {
        const { navigation } = this.props;
        navigation.goBack(null);
    }
    async handleBackPress() {
        this.props.dispatch(back30());
    }
    async handleForwardPress() {
        this.props.dispatch(forward30());
    }
    handlePlayPress = () => {
        if (this.props.isPlaying) {
            this.props.dispatch(pause());
        } else {
            this.props.dispatch(play());
        }
    }
    handleSliderChange = (value) => {
        this.props.dispatch(seek(value));
    }

    componentDidMount() {
        // this.props.dispatch(play());
    }

    componentDidUpdate() {
        if (!(this.props.track.isLive === true)) {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        /* Remove didFocus Listener */
        if (didFocusListener) didFocusListener.remove();
        clearInterval(this.interval);
    }

    render() {
        return (
            <Container>
                <View style={styles.playerContainer}>
                    <ImageBackground
                        source={{ uri: this.props.track.artwork }}
                        style={styles.imageBackgroundContainer}
                        blurRadius={10}
                        imageStyle={styles.imageBackground}
                    >
                        <Header
                            leftVisible={
                                this.props.navigation.getParam('closeButtonVisible') === true ?
                                    true : false
                            }
                            titleVisible={this.props.track.isLive ? true : false}
                            rightVisible={false}
                            title='Live'
                            onPressLeft={this.handleClosePress}
                        />
                        <Cover
                            image={this.props.track.artwork}
                            updatePeriodically={true}
                            updateInterval={15000}
                        />
                        <Info
                            title={this.props.track.title}
                            subtitle={this.props.track.artist}
                        />
                        <Controls
                            play={this.props.isPlaying}
                            leftVisible={this.props.track.isLive ? false : true}
                            rightVisible={this.props.track.isLive ? false : true}
                            onPressCenter={this.handlePlayPress}
                            onPressLeft={this.handleBackPress}
                            onPressRight={this.handleForwardPress}
                        />
                        <SeekBar
                            seekable={this.props.track.isLive ? false : true}
                            onValueChange={this.handleSliderChange}
                        />
                        <View style={styles.animationContainer}>
                        </View>
                    </ImageBackground>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        track: state.player.track,
        isPlaying: state.player.isPlaying
    };
};

export default connect(mapStateToProps)(connectAlert(Player));