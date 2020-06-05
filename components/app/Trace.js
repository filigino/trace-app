import React from 'react'
import {connect} from 'react-redux'
import BackgroundFetch from 'react-native-background-fetch'
import {Audio} from 'expo-av'
import {StatusBar, Text} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {styles} from '../../styles'
import Exposures from './Exposures'
import Home from './Home'
import SelfReport from './SelfReport'
import Debug from './Debug'
import {url} from '../../url'
import {addExposure} from '../../redux/ActionCreators'

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'dodgerblue'
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

const mapStateToProps = (state) => ({
    otherIDs: state.IDs.otherIDs
})

const mapDispatchToProps = (dispatch) => ({
    addExposure: (ID, timestamp) => dispatch(addExposure(ID, timestamp))
})

class Trace extends React.Component {
    componentDidMount() {
        const soundObject = new Audio.Sound()
        soundObject.loadAsync(require('../../assets/sounds/CORONAVIRUS.mp3'))
        .then(() => soundObject.playAsync())
        .catch((err) => console.log(err))

        BackgroundFetch.configure({
            minimumFetchInterval: 1440 // 1 day in minutes
        }, async (taskId) => {
            fetch(url + 'infections', {
                method: 'GET'
            })
            .then((res) => res.json())
            .then((infections) => {
                for (const infection of infections) {
                    const infectedID = infection.ID
                    for (const otherID of this.props.otherIDs) {
                        if (otherID.ID === infectedID) {
                            this.props.addExposure(otherID.ID, otherID.timestamp)
                            break
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })

            console.log("[js] Received background-fetch event: ", taskId)
            // Required: Signal completion of your task to native code
            // If you fail to do this, the OS can terminate your app
            // or assign battery-blame for consuming too much background-time
            BackgroundFetch.finish(taskId)
        }, (error) => {
            console.log("[js] RNBackgroundFetch failed to start")
        })
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(Trace)
