import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image } from 'react-native';

import styles from './styles';

class Cover extends Component {
    static propTypes = {
        image: PropTypes.string,
        updatePeriodically: PropTypes.bool,
        updateInterval: PropTypes.number
    }
    constructor(props) {
        super(props);
        this.state = {
            image: props.image
        }
    }
    render() {
        return (
            <View style={styles.coverContainer}>
                <Image
                    style={styles.cover}
                    source={{ uri: this.props.image }}
                />
            </View>
        );
    }

};

export default Cover;