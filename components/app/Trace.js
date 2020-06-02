import React from 'react'
import {Text} from 'react-native'
import {StatusBar} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {styles} from '../../styles'
import Exposures from './Exposures'
import Home from './Home'
import SelfReport from './SelfReport'
import Debug from './Debug'

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rebeccapurple'
                },
                headerTintColor: 'white',
                headerTitle:
                    <MaterialCommunityIcons
                        name={'draw'}
                        size={30}
                    />
            }}
        >
            <HomeStack.Screen name='Home' component={Home}
                initialParams={{styles: styles}}
            />
        </HomeStack.Navigator>
    )
}

const ExposuresStack = createStackNavigator()

const ExposuresStackScreen = () => {
    return (
        <ExposuresStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rebeccapurple'
                },
                headerTintColor: 'white',
                headerTitle:
                    <MaterialCommunityIcons
                        name={'draw'}
                        size={30}
                    />
            }}
        >
            <ExposuresStack.Screen name='Exposures' component={Exposures}
                initialParams={{styles: styles}}
            />
        </ExposuresStack.Navigator>
    )
}

const SelfReportStack = createStackNavigator()

const SelfReportStackScreen = () => {
    return (
        <SelfReportStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rebeccapurple'
                },
                headerTintColor: 'white',
                headerTitle:
                    <MaterialCommunityIcons
                        name={'draw'}
                        size={30}
                    />
            }}
        >
            <SelfReportStack.Screen name='Self-Report' component={SelfReport}
                initialParams={{styles: styles}}
            />
        </SelfReportStack.Navigator>
    )
}

const DebugStack = createStackNavigator()

const DebugStackScreen = () => {
    return (
        <DebugStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'rebeccapurple'
                },
                headerTintColor: 'white',
                headerTitle:
                    <MaterialCommunityIcons
                        name={'draw'}
                        size={30}
                    />
            }}
        >
            <DebugStack.Screen name='Debug' component={Debug}
                initialParams={{styles: styles}}
            />
        </DebugStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

export default class Trace extends React.Component {
    render() {
        return (
            <>
                <StatusBar barStyle='light-content'/>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            // add 'focused' as argument if needed for switching icons when focused/not
                            tabBarIcon: ({color, size}) => {
                                if (route.name ==='Home') {
                                    return (
                                        <MaterialCommunityIcons name={'home'} size={size} color={color} />
                                    )
                                } else if (route.name === 'Exposures') {
                                    return (
                                        <MaterialCommunityIcons name={'format-list-bulleted'} size={size} color={color} />
                                    )
                                } else if (route.name === 'Self-Report') {
                                    return (
                                        <MaterialCommunityIcons name={'comment-alert'} size={size} color={color} />
                                    )
                                }
                            }
                        })}
                        tabBarOptions={{
                            activeTintColor: '#6b52ae',
                            inactiveTintColor: 'gray'
                        }}
                        initialRouteName='Home'
                    >
                        <Tab.Screen name='Home' component={HomeStackScreen} />
                        <Tab.Screen name='Exposures' component={ExposuresStackScreen} />
                        <Tab.Screen name='Self-Report' component={SelfReportStackScreen} />
                        <Tab.Screen name='Debug' component={DebugStackScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
            </>
        )
    }
}
