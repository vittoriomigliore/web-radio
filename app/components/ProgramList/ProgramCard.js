import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, Image, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';

import styles from './styles';

export default class ProgramCard extends Component {
    static propTypes = {
        text: PropTypes.string,
        onPress: PropTypes.func,
        image: PropTypes.string,
        size: PropTypes.object
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                underlayColor={'transparent'}>
                <Card
                    title={null}
                    containerStyle={[styles.card, this.props.size.cardStyle]}
                >
                    <Image 
                        source={{ uri: this.props.image }}
                        style={[this.props.size.cardImageStyle]}
                    />
                    <Text style={styles.text}>
                        {this.props.text}
                    </Text>
                </Card>
            </TouchableHighlight>
        );
    }
}