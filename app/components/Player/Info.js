import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
// import { Icon } from 'react-native-elements';

import styles from './styles';

const Info = ({
    title,
    subtitle,
    onPressLeftIcon,
    onPressRightIcon
}) => {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.titleContainer}>
                {/* <Icon
                    name='airplay'
                    type='material-community'
                    color='white'
                    size={24}
                    onPress={onPressLeftIcon}
                    underlayColor={'transparent'}
                /> */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.artist}>{subtitle}</Text>
                </View>
                {/* <Icon
                    name='more-vertical'
                    type='feather'
                    color='white'
                    size={24}
                    onPress={onPressRightIcon}
                    underlayColor={'transparent'}
                /> */}
            </View>
        </View>
    );
};

Info.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPressLeftIcon: PropTypes.func,
    onPressRightIcon: PropTypes.func
};

export default Info;