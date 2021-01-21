import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Header, createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View } from 'react-native'
import { Icon, Button } from 'react-native-elements';

import Home from 'screens/Home';
import Programs from 'screens/Programs';
import Program from 'screens/Program';
import Player from 'screens/Player';
import Search from 'screens/Search';
import News from 'screens/News';

const ProgramStack = createStackNavigator(
    {
        Program: {
            screen: Program,
            navigationOptions: ({ navigation }) => {
                return ({})
            },
        },
        Player: {
            screen: Player,
            navigationOptions: {
                header: null,
                headerTitle: 'Player',
            },
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            return ({
                tabBarVisible: false
            })
        },
        defaultNavigationOptions: ({ navigation }) => {
            return ({
                headerTitle: null,
                headerTransparent: true,
                headerTintColor: '#FFF',
                headerBackground: <View style={{
                    height: Header.HEIGHT,
                    backgroundColor: 'rgba(255,255,255,0.0)'
                }} />
            })
        }
    }
)

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => {
                const onPress = () => {
                    navigation.navigate('Player');
                }
                return ({
                    header: null
                })
            },
        },
        Programs: {
            screen: Programs,
            navigationOptions: ({ navigation }) => {
                let title = '';
                if (navigation.state.params) {
                    title = navigation.state.params.title
                }
                return ({
                    headerTitle: title
                })
            }
        },
        Program: {
            screen: ProgramStack,
            navigationOptions: ({ navigation }) => {
                return ({})
            },
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            // Hide tabBar for all screens except root
            let tabBarVisible = true;
            if (navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return ({
                tabBarVisible
            })
        },
        defaultNavigationOptions: ({ navigation }) => {
            return ({
                headerTitle: null,
                headerTransparent: true,
                headerTintColor: '#FFF',
                headerBackground: <View style={{
                    height: Header.HEIGHT,
                    backgroundColor: 'rgba(255,255,255,0.0)'
                }} />
            })
        }
    }
)

const SearchStack = createStackNavigator(
    {
        Search: {
            screen: Search,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: () => null
                })
            },
        },
        Program: {
            screen: ProgramStack,
            navigationOptions: ({ navigation }) => {
                return ({})
            },
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            // Hide tabBar for all screens except root
            let tabBarVisible = true;
            if (navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return ({
                tabBarVisible
            })
        },
        defaultNavigationOptions: ({ navigation }) => {
            return ({
                headerTitle: null,
                headerTransparent: true,
                headerTintColor: '#FFF',
                headerBackground: <View style={{
                    height: Header.HEIGHT,
                    backgroundColor: 'rgba(255,255,255,0.0)'
                }} />
            })
        }
    }
)

const NewsStack = createStackNavigator(
    {
        News: {
            screen: News,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: () => null
                })
            },
        }
    },
    {
        navigationOptions: ({ navigation }) => {
            // Hide tabBar for all screens except root
            let tabBarVisible = true;
            if (navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return ({
                tabBarVisible
            })
        },
        defaultNavigationOptions: ({ navigation }) => {
            return ({
                headerTitle: null,
                headerTransparent: true,
                headerTintColor: '#FFF',
                headerBackground: <View style={{
                    height: Header.HEIGHT,
                    backgroundColor: 'rgba(255,255,255,0.0)'
                }} />
            })
        }
    }
)

const MainStack = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: () => ({
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="home"
                        color={tintColor}
                        size={24}
                    />
                ),
            })
        },
        Search: {
            screen: SearchStack,
            navigationOptions: () => ({
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="search"
                        color={tintColor}
                        size={24}
                    />
                )
            })
        },
        News: {
            screen: NewsStack,
            navigationOptions: () => ({
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="open-book"
                        type="entypo"
                        color={tintColor}
                        size={24}
                    />
                )
            })
        },
        Live: {
            screen: Player,
            params: {
                isLive: true,
                closeButtonVisible: true
            },
            navigationOptions: () => ({
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="radio"
                        color={tintColor}
                        size={24}
                    />
                ),
                tabBarVisible: false,
            })
        },
    },
    {
        lazy: false,
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#2e123b',
            inactiveTintColor: '#b0b9c3',
            style: {
                backgroundColor: '#FFF',
                height: 60,
                paddingVertical: 5,
            }
        }
    }

);

export default createAppContainer(MainStack);