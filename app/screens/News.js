import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Header } from 'react-navigation-stack';
import { connect } from 'react-redux';

import { connectAlert } from 'components/Alert';
import { Container } from 'components/Container';

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func
    };

    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingTop: Header.HEIGHT,
                    backgroundColor: 'rgb(24, 24, 24)'
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <Container>
                </Container>
            </ScrollView>
        )
    }

}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(connectAlert(Home));