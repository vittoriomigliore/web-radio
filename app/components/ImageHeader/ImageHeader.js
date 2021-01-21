import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

const ImageHeader = ({
    title,
    subtitle,
    image,
    onPressButton,
    alreadySubscribed
}) => {
    return (
        <ImageBackground
            source={{ uri: image }}
            style={styles.imageBackground}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            </View>
            <Icon
                onPress={onPressButton}
                size={alreadySubscribed ? 48 : 60}
                name={alreadySubscribed ? 'check' : 'plus'}
                type={alreadySubscribed ? 'feather' : 'entypo'}
                color='#FFF'
                containerStyle={[
                    styles.icon,
                    alreadySubscribed ? { padding: 6 } : {}]}
                underlayColor={'transparent'}
            />
            <View style={styles.triangle} />
        </ImageBackground>

    );
};

ImageHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    alreadySubscribed: PropTypes.bool,
    onPressButton: PropTypes.func
};

export default ImageHeader;