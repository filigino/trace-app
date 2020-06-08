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
import {deleteOtherID, addExposure, updateLastCheckTime} from '../../redux/ActionCreators'

const Tab = createBottomTabNavigator()

const mapStateToProps = (state) => ({
    otherIDs: state.IDs.otherIDs
})

const mapDispatchToProps = (dispatch) => ({
    deleteOtherID: (ID) => dispatch(deleteOtherID(ID)),
    addExposure: (ID, timestamp) => dispatch(addExposure(ID, timestamp)),
    updateLastCheckTime: (time) => dispatch(updateLastCheckTime(time))
})

class Trace extends React.Component {
    componentDidMount() {
        const soundObject = new Audio.Sound()
        soundObject.loadAsync(require('../../assets/sounds/CORONAVIRUS.mp3'))
        .then(() => soundObject.setVolumeAsync(0.2))
        .then(() => soundObject.playAsync())
        .catch((err) => console.log(err))

        this.checkExposure()

        BackgroundFetch.configure({
            minimumFetchInterval: 15
            // minimumFetchInterval: 360 // 6 hours in minutes
        }, async (taskId) => {
            this.checkExposure()

            BackgroundFetch.finish(taskId)
        }, (err) => {
            console.log('[js] RNBackgroundFetch failed to start')
        })
    }

    checkExposure() {
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
                        this.props.deleteOtherID(otherID.ID)
                        break
                    }
                }
            }
            this.props.updateLastCheckTime(Date.now())
        })
        .catch((err) => console.log(err))
    }

    render() {
        return (
            <>
                <StatusBar barStyle='dark-content'/>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            // add 'focused' as argument if needed for switching icons when focused/not
                            tabBarIcon: ({color, size}) => {
                                if (route.name ==='Home') {
                                    return (
                                        <MaterialCommunityIcons name={'home'} color={color} size={size} />
                                    )
                                } else if (route.name === 'Exposures') {
                                    return (
                                        <MaterialCommunityIcons name={'format-list-bulleted'} color={color} size={size} />
                                    )
                                } else if (route.name === 'Self-Report') {
                                    return (
                                        <MaterialCommunityIcons name={'comment-alert'} color={color} size={size} />
                                    )
                                }
                            }
                        })}
                        initialRouteName='Home'
                    >
                        <Tab.Screen name='Home' component={Home} initialParams={{styles: styles}}/>
                        <Tab.Screen name='Exposures' component={Exposures} initialParams={{styles: styles}}/>
                        <Tab.Screen name='Self-Report' component={SelfReport} initialParams={{styles: styles}}/>
                        {/*<Tab.Screen name='Debug' component={Debug} initialParams={{styles: styles}}/>*/}
                    </Tab.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trace)
