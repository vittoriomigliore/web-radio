import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Header } from 'react-navigation-stack'
import { connect } from 'react-redux';

import { connectAlert } from 'components/Alert';
import { Container } from 'components/Container';
import { ProgramList, Sizes } from 'components/ProgramList';

class Programs extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        filteredPrograms: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    handleProgramPress = (program) => {
        const { navigation } = this.props;
        navigation.navigate('Program', {
            programTitle: program.title
        })
    }

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
                    <ProgramList
                        data={this.props.filteredPrograms}
                        size={Sizes.medium}
                        columns={2}
                        onPressProgram={this.handleProgramPress}
                    />
                </Container>
            </ScrollView>
        )
    }

}

const mapStateToProps = (state, props) => {
    const filter = props.navigation.getParam('programs');
    const filteredPrograms = state.programs.programs.filter((item) => {
        return filter.includes(item.title);
    })
    return {
        filteredPrograms
    };
};

export default connect(mapStateToProps)(connectAlert(Programs));