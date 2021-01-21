import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, Dimensions, ScrollView } from 'react-native';
import { Card } from "react-native-elements";

import { formatDate } from 'config/utils'

const { height } = Dimensions.get('window');

class PodcastCard extends Component {
    static propTypes = {
        podcast: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card
                title={this.props.podcast.title}
                image={{ uri: this.props.podcast.image }}>
                <ScrollView style={{
                    flexGrow: 1,
                    maxHeight: height / 2
                }}>
                    <Text style={{ marginBottom: 10 }}>
                        {formatDate(this.props.podcast.datetime)}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                        {this.props.podcast.description}
                    </Text>
                </ScrollView>
            </Card>
        );
    }
}

export default PodcastCard;