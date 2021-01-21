import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { Slider } from 'react-native-elements';
import TrackPlayer from 'react-native-track-player';

import styles from './styles';

class SeekBar extends TrackPlayer.ProgressComponent {
    static propTypes = {
        seekable: PropTypes.bool,
        onValueChange: PropTypes.func
    }
    constructor(props) {
        super(props);
    }
    formatTime(time) {
        if (time && !isNaN(time)) {
            time = Math.floor(time);
            var minutes = Math.floor(time / 60);
            minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
            var seconds = time - minutes * 60;
            seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
            return (minutes + ':' + seconds)
        } else {
            return '--:--'
        }
    }
    render() {
        return (
            <View style={styles.seekbarContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20
                }}>
                    <Text style={{ color: '#FFF' }}>
                        {this.formatTime(this.state.position)}
                    </Text>
                    <Text style={{ color: '#FFF' }}>
                        {
                            this.props.seekable ?
                                this.formatTime(this.state.duration - this.state.position) :
                                null
                        }
                    </Text>
                </View>
                <Slider
                    disabled={this.props.seekable ? false : true}
                    value={this.getProgress()}
                    thumbTintColor={'transparent'}
                    maximumTrackTintColor={'#151a21'}
                    minimumTrackTintColor={'#b42ea4'}
                    thumbTouchSize={{ width: 100, height: 100 }}
                    onValueChange={this.props.onValueChange}
                />
            </View>
        )
    }
}
export default SeekBar;