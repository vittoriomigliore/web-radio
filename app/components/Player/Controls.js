import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

const Controls = ({
    play,
    leftVisible,
    centerVisible,
    rightVisible,
    onPressCenter,
    onPressLeft,
    onPressRight
}) => {
    return (
        <View style={styles.buttonContainer}>
            {
                leftVisible === false ?
                    null :
                    <Icon
                        name='replay-30'
                        size={38}
                        color='white'
                        onPress={onPressLeft}
                        underlayColor='transparent'
                    />
            }
            {
                centerVisible === false ?
                    null :
                    <Icon
                        name={play ? 'pause' : 'play'}
                        type='font-awesome-5'
                        iconStyle={styles.play}
                        containerStyle={styles.playContainer}
                        onPress={onPressCenter}
                        underlayColor='transparent'
                    />
            }
            {
                rightVisible === false ?
                    null :
                    <Icon
                        name='forward-30'
                        size={38}
                        color='white'
                        onPress={onPressRight}
                        underlayColor='transparent'
                    />
            }
        </View>
    );
};

Controls.propTypes = {
    play: PropTypes.bool,
    leftVisible: PropTypes.bool,
    centerVisible: PropTypes.bool,
    rightVisible: PropTypes.bool,
    onPressCenter: PropTypes.func,
    onPressLeft: PropTypes.func,
    onPressRight: PropTypes.func
};

export default Controls;