import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Header } from 'react-navigation-stack';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import { connectAlert } from 'components/Alert';
import { Container } from 'components/Container';
import { ProgramList, Sizes } from 'components/ProgramList';

import { getAllPrograms, getActivePrograms, resetPrograms } from 'actions/programs';
import { resetPlayer } from 'actions/player';

import { nowPlayingLabel, subscribedLabel, recentLabel, popularLabel, activeLabel } from 'res/strings';

import config from 'config/config';

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        subscribed: PropTypes.array,
        subscribedPrograms: PropTypes.array,
        recent: PropTypes.array,
        recentPrograms: PropTypes.array,
        popular: PropTypes.array,
        popularPrograms: PropTypes.array,
        isPlaying: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(resetPlayer());
        dispatch(resetPrograms());

        dispatch(getAllPrograms());
        dispatch(getActivePrograms());
    }

    _onRefresh = () => {
        const { dispatch } = this.props;
        this.setState({ refreshing: true });
        dispatch(getAllPrograms());
        dispatch(getActivePrograms());
        this.setState({ refreshing: false });
    }

    handleSeeMorePress = (title, programs) => {
        const { navigation } = this.props;
        navigation.navigate('Programs', {
            title,
            programs
        })
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
                    // paddingTop: Header.HEIGHT,
                    backgroundColor: 'rgb(24, 24, 24)'
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                {
                    this.props.isPlaying ?
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            height: Header.HEIGHT,
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                onPress={() => { this.props.navigation.navigate('Player'); }}
                                title={nowPlayingLabel}
                                type="clear"
                                containerStyle={{ alignSelf: 'flex-end' }}
                                textStyle={{ alignSelf: 'flex-end' }}
                                buttonStyle={{ alignSelf: 'flex-end', padding: 10 }}
                            />
                        </View> :
                        <View style={{
                            width: '100%',
                            height: Header.HEIGHT / 2
                        }} />
                }
                <Container>

                    {
                        this.props.subscribedPrograms.length > 0 ?
                            <ProgramList
                                title={subscribedLabel}
                                horizontal={true}
                                seeMore={this.props.subscribedPrograms.length > config.home_items_No.subscribed ? true : false}
                                data={this.props.subscribedPrograms}
                                size={Sizes.medium}
                                onPressSeeMore={() => {
                                    this.handleSeeMorePress(subscribedLabel, this.props.subscribed)
                                }}
                                onPressProgram={this.handleProgramPress}
                            /> : null
                    }
                    {
                        this.props.recentPrograms.length > 0 ?
                            <ProgramList
                                title={recentLabel}
                                horizontal={true}
                                // seeMore
                                data={this.props.recentPrograms}
                                size={Sizes.small}
                                onPressSeeMore={() => {
                                    this.handleSeeMorePress(recentLabel, this.props.recent)
                                }}
                                onPressProgram={this.handleProgramPress}
                            /> : null
                    }
                    {
                        this.props.popularPrograms.length > 0 ?
                            <ProgramList
                                title={popularLabel}
                                horizontal={true}
                                seeMore
                                data={this.props.popularPrograms}
                                size={Sizes.medium}
                                onPressSeeMore={() => {
                                    this.handleSeeMorePress(popularLabel, this.props.popular)
                                }}
                                onPressProgram={this.handleProgramPress}
                            /> : null
                    }
                    {
                        this.props.activePrograms.length > 0 ?
                            <ProgramList
                                title={activeLabel}
                                horizontal={true}
                                seeMore
                                data={this.props.activePrograms}
                                size={Sizes.medium}
                                onPressSeeMore={() => {
                                    this.handleSeeMorePress(activeLabel, this.props.active)
                                }}
                                onPressProgram={this.handleProgramPress}
                            /> : null
                    }

                </Container>
            </ScrollView>
        )
    }

    async componentDidMount() {
        await TrackPlayer.setupPlayer({
            playBuffer: 4
        })
        TrackPlayer.updateOptions({
            stopWithApp: true,
            notificationCapabilities: [TrackPlayer.CAPABILITY_PLAY]
        });
        TrackPlayer.addEventListener('playback-queue-ended', () => {
            TrackPlayer.stop();
        })
        TrackPlayer.addEventListener('playback-error', () => {
            TrackPlayer.reset();
        })
    }

}

const mapStateToProps = (state) => {

    const subscribedPrograms = state.programs.programs.filter((item) => {
        return state.programs.subscribed.includes(item.title);
    }).slice(0, config.home_items_No.subscribed)
    const recentPrograms = state.programs.programs.filter((item) => {
        return state.programs.recent.includes(item.title);
    }).slice(0, config.home_items_No.recent)
    const popularPrograms = state.programs.programs.filter((item) => {
        return state.programs.popular.includes(item.title);
    }).slice(0, config.home_items_No.popular)
    const activePrograms = state.programs.programs.filter((item) => {
        return state.programs.active.includes(item.title);
    }).slice(0, config.home_items_No.active)

    return {
        subscribed: state.programs.subscribed,
        subscribedPrograms,
        recent: state.programs.recent,
        recentPrograms,
        popular: state.programs.popular,
        popularPrograms,
        active: state.programs.active,
        activePrograms,

        isPlaying: state.player.isPlaying
    };
};

export default connect(mapStateToProps)(connectAlert(Home));