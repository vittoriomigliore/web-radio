import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Header } from 'react-navigation-stack';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import { connectAlert } from 'components/Alert';
import { Container } from 'components/Container';
import { ProgramList, Sizes } from 'components/ProgramList';

import { searchPrograms } from 'actions/programs';

import { searchLabel, searchDescLabel } from 'res/strings';

class Search extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        foundPrograms: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }

    handleProgramPress = (program) => {
        const { navigation } = this.props;
        navigation.navigate('Program', {
            programTitle: program.title
        })
    }

    searchTextChanged = (value) => {
        this.setState({
            searchText: value
        });
        this.props.dispatch(searchPrograms(value));
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <SearchBar
                    placeholder={searchLabel}
                    onChangeText={this.searchTextChanged}
                    value={this.state.searchText}
                />
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
                        {this.props.foundPrograms.length > 0 ?
                            <ProgramList
                                data={this.props.foundPrograms}
                                size={Sizes.medium}
                                columns={2}
                                onPressProgram={this.handleProgramPress}
                            /> :
                            <Text style={{
                                color: 'rgb(170, 170, 170)',
                                padding: 30,
                                textAlign: 'center',
                            }}>
                                {searchDescLabel}
                            </Text>
                        }
                    </Container>
                </ScrollView>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    const foundPrograms = state.programs.programs.filter((item) => {
        return state.programs.found.includes(item.title);
    })

    return {
        foundPrograms
    };
};

export default connect(mapStateToProps)(connectAlert(Search));