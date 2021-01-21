import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

const Header = ({
    leftVisible,
    titleVisible,
    rightVisible,
    onPressLeft,
    onPressTitle,
    onPressRight,
    title
}) => {
    return (
        <View style={styles.headerContainer}>
            {
                leftVisible === false ?
                    null :
                    <Icon
                        name='chevron-thin-down'
                        type='entypo'
                        onPress={onPressLeft}
                        containeStyle={styles.headerButton}
                        color='white'
                        underlayColor='transparent'
                    />
            }
            {
                titleVisible === false ?
                    null :
                    <Text
                        onPress={onPressTitle}
                        style={styles.headerTitle}>
                        {title.toUpperCase()}
                    </Text>
            }
            {
                rightVisible === false ?
                    null :
                    <Icon
                        name='chevron-thin-down'
                        type='entypo'
                        onPress={onPressRight}
                        containeStyle={styles.headerButton}
                        color='white'
                        underlayColor='transparent' />
            }
        </View>
    );
}

Header.propTypes = {
    leftVisible: PropTypes.bool,
    titleVisible: PropTypes.bool,
    rightVisible: PropTypes.bool,
    onPressLeft: PropTypes.func,
    onPressTitle: PropTypes.func,
    onPressRight: PropTypes.func,
    title: PropTypes.string
};

export default Header;