import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Avatar, ListItem, Divider, Icon, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import Modal from "react-native-modal";

import { connectAlert } from 'components/Alert';
import { Container } from 'components/Container';
import { ImageHeader } from 'components/ImageHeader';
import { AuthorCard } from 'components/AuthorCard';
import { PodcastCard } from 'components/PodcastCard';

import { subscribe, unsubscribe, getSingleProgram, addRecentProgram } from 'actions/programs';
import { load } from 'actions/player';

import { authorsLabel, podcastLabel, noPodcastFoundLabel } from 'res/strings';

import { formatDate } from 'config/utils'

class Program extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        subscribed: PropTypes.bool,
        podcasts: PropTypes.array,
        authors: PropTypes.array,
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        onair: PropTypes.bool,
        periodicity: PropTypes.string,
        time: PropTypes.string,
        facebook: PropTypes.string,
        instagram: PropTypes.string,
        twitter: PropTypes.string,
    };

    constructor(props) {
        super(props);
        const programTitle = this.props.navigation.getParam('programTitle');
        if (programTitle) this.props.dispatch(getSingleProgram(programTitle));
        this.state = {
            authorModalVisible: false,
            podcastModalVisible: false
        }

        
    }

    handleAddPress = (program_title) => {
        if (this.props.subscribed) {
            this.props.dispatch(unsubscribe(program_title));
        } else {
            this.props.dispatch(subscribe(program_title));
        }
        this.props.navigation.goBack(null);
    }

    handleAuthorPress = (author) => { this.setState({ authorModalVisible: true, author }); }
    closeAuthorModal = () => this.setState({ authorModalVisible: false });

    handlePodcastInfoPress = (podcast) => { this.setState({ podcastModalVisible: true, podcast }); }
    closePodcastModal = () => this.setState({ podcastModalVisible: false });

    handlePodcastPlayPress = (podcast) => {
        const { navigation, dispatch } = this.props;
        /* Load Track */
        const track = {
            id: '0',
            url: podcast.uri,
            title: podcast.title,
            artist: podcast.program_title,
            artwork: podcast.image
        }
        dispatch(load(track));
        /* Go to Player */
        navigation.navigate('Player');
        /* Add program to recently listened */
        dispatch(addRecentProgram(this.props.title));
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <Container>
                    <Modal
                        isVisible={this.state.authorModalVisible}
                        animationIn='slideInUp'
                        backdropOpacity={0.3}
                        onBackdropPress={this.closeAuthorModal}
                        useNativeDriver={true}
                    // hideModalContentWhileAnimating={true}
                    >
                        <AuthorCard author={this.state.author} />
                    </Modal>
                    <Modal
                        isVisible={this.state.podcastModalVisible}
                        animationIn='slideInUp'
                        backdropOpacity={0.3}
                        onBackdropPress={this.closePodcastModal}
                        useNativeDriver={true}
                        scrollOffset={10}
                    >
                        <PodcastCard podcast={this.state.podcast} />
                    </Modal>
                    <ImageHeader
                        title={this.props.title}
                        subtitle={this.props.periodicity}
                        image={this.props.image}
                        alreadySubscribed={this.props.subscribed}
                        onPressButton={() => { this.handleAddPress(this.props.title) }}
                    />
                    <View style={styles.contentContainer}>
                        <View style={styles.descriptionContainer}>
                            <Text> {this.props.description} </Text>
                        </View>
                        {this.props.authors.length > 0 ?
                            <View style={styles.authorsContainer}>
                                <Text style={styles.authorsLabel}>{authorsLabel}</Text>
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    style={styles.authorsAvatarList}
                                    horizontal
                                    data={this.props.authors}
                                    renderItem={({ item }) => {
                                        return (
                                            <Avatar
                                                size="medium"
                                                rounded
                                                containerStyle={styles.authorsAvatarListItem}
                                                source={{ uri: item.image }}
                                                onPress={() => { this.handleAuthorPress(item) }}
                                            />)
                                    }} />
                            </View> :
                            null
                        }
                        {this.props.podcasts.length > 0 ?
                            <View style={styles.podcastContainer}>
                                <Text style={styles.podcastLabel}>{podcastLabel}</Text>
                                <FlatList
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.props.podcasts}
                                    renderItem={({ item }) => {
                                        return (
                                            <ListItem>
                                                <Icon name='info' onPress={() => { this.handlePodcastInfoPress(item) }} underlayColor='transparent' />
                                                <ListItem.Content>
                                                    <ListItem.Title>{item.title}</ListItem.Title>
                                                    <ListItem.Subtitle>{formatDate(item.datetime)}</ListItem.Subtitle>
                                                </ListItem.Content>
                                                <Icon name='play' type='font-awesome'  onPress={() => { this.handlePodcastPlayPress(item) }} underlayColor='transparent' />
                                            </ListItem>
                                        )
                                    }}
                                    ItemSeparatorComponent={Divider}
                                    ListHeaderComponent={Divider}
                                    ListFooterComponent={Divider}
                                />
                            </View> :
                            <View style={styles.podcastContainer}>
                                <Text style={styles.podcastLabel}>{noPodcastFoundLabel}</Text>
                            </View>
                        }
                        <View style={styles.socialContainer}>
                            {
                                this.props.facebook ?
                                    <SocialIcon
                                        type='facebook'
                                        onPress={() => { }}
                                    /> : null
                            }
                            {
                                this.props.instagram ?
                                    <SocialIcon
                                        type='instagram'
                                        onPress={() => { }}
                                    /> : null
                            }
                            {
                                this.props.twitter ?
                                    <SocialIcon
                                        type='twitter'
                                        onPress={() => { }}
                                    /> : null
                            }
                        </View>
                    </View>
                </Container>
            </ScrollView >
        )
    }
}

const mapStateToProps = (state, props) => {
    const programTitle = props.navigation.getParam('programTitle');

    const program = programTitle ? state.programs.programs.find(item => item.title === programTitle) : null;
    const subscribed = programTitle ? state.programs.subscribed.some(item => item === programTitle) : false;
    const podcasts = programTitle ? state.programs.podcasts.filter(item => item.program_title === programTitle) : [];

    const authors = program && program.authors ? state.programs.authors.filter(item => {
        return program.authors.some(el => item.firstname === el.firstName && item.lastname === el.lastName);
    }) : [];

    return {
        ...program,
        subscribed,
        podcasts,
        authors
    };
};

const styles = {
    contentContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        width: '100%',
        minHeight: '50%'
    },
    descriptionContainer: {
        flex: 1,
        paddingVertical: 10
    },
    authorsContainer: {
        flex: 1,
        paddingVertical: 10
    },
    authorsLabel: {
        fontSize: 16,
        fontWeight: '400'
    },
    authorsAvatarList: {
        paddingVertical: 5
    },
    authorsAvatarListItem: {
        marginRight: 10
    },
    podcastContainer: {
        flex: 1,
        paddingVertical: 10,
        // color: 'rgb(24, 24, 24)'
    },
    podcastLabel: {
        fontSize: 20,
        fontWeight: '400'
    },
    socialContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    }
}

export default connect(mapStateToProps)(connectAlert(Program));