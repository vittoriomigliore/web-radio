import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from "react-native-elements";

class AuthorCard extends Component {
    static propTypes = {
        author: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <Card.Title>
                {
                    this.props.author.firstname + ' ' +
                    this.props.author.nickname + ' ' +
                    this.props.author.lastname
                }
                </Card.Title>
                <Card.Image source={{ uri: this.props.author.image }} />
                <Text style={{ marginBottom: 10 }}>
                    {this.props.author.role}
                </Text>
            </Card>
        );
    }
}

export default AuthorCard;