import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

import ProgramCard from './ProgramCard';

const { width } = Dimensions.get('window');

export default class ProgramList extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                flex: 1,
                marginHorizontal: 5,
                alignItems: 'stretch',
                justifyContent: 'center',
            }}>
                {this.props.title || this.props.seeMore ?
                    <View style={{
                        width: width,
                        flexDirection: 'row',
                        alignItems: 'stretch',
                        justifyContent: 'space-between'
                    }}>
                        {
                            this.props.title ?
                                <Text
                                    style={[
                                        {
                                            alignSelf: 'flex-end',
                                            color: 'white',
                                            padding: 8,
                                            marginHorizontal: 10
                                        },
                                        this.props.size.titleStyle
                                    ]}>
                                    {this.props.title}
                                </Text> :
                                null
                        }
                        {
                            this.props.seeMore ?
                                <Button
                                    onPress={this.props.onPressSeeMore}
                                    title="Vedi Tutto"
                                    type="clear"
                                    containerStyle={{
                                        alignSelf: 'flex-end',
                                        // padding: 0
                                    }}
                                    textStyle={{
                                        alignSelf: 'flex-end',
                                    }}
                                    buttonStyle={{
                                        alignSelf: 'flex-end',
                                        padding: 10
                                    }}
                                />
                                : null}
                    </View> :
                    null
                }
                <FlatList
                    horizontal={this.props.horizontal}
                    data={this.props.data}
                    numColumns={this.props.columns}
                    renderItem={({ item }) => {
                        return (
                            <ProgramCard
                                text={item.title}
                                image={item.image}
                                size={this.props.size}
                                onPress={() => {
                                    this.props.onPressProgram(item);
                                }}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

ProgramList.propTypes = {
    title: PropTypes.string,
    horizontal: PropTypes.bool,
    columns: PropTypes.number,
    data: PropTypes.array,
    size: PropTypes.object,
    seeMore: PropTypes.bool,
    onPressSeeMore: PropTypes.func,
    onPressProgram: PropTypes.func
};