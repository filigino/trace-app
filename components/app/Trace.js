import React from 'react'
import {connect} from 'react-redux'
import {Audio} from 'expo-av'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import {StatusBar, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Exposures from './Exposures'
import Home from './Home'
import SelfReport from './SelfReport'
import Debug from './Debug' // debug
import {styles} from '../../styles'

const Tab = createBottomTabNavigator()

const mapStateToProps = (state) => ({
    badgeNum: state.exposures.badgeNum,
    initialRouteName: state.launch.initialRouteName
})

class Trace extends React.Component {
    componentDidMount() {
        const soundObject = new Audio.Sound()
        soundObject.loadAsync(require('../../assets/sounds/CORONAVIRUS.mp3'))
        .then(() => soundObject.setVolumeAsync(0.2))
        .then(() => soundObject.playAsync())
        .catch((err) => console.log(err))

        // PushNotificationIOS.requestPermissions()
    }

    // async obtainNotificationPermission() {
    //     let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
    //     if (permission.status !== 'granted') {
    //         permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
    //         if (permission.status !== 'granted') {
    //             Alert.alert('Permission not granted to show notifications')
    //         }
    //     }
    //     return permission
    // }
    //
    // async presentLocalNotification(date) {
    //     console.log('NOTIF')
    //     await this.obtainNotificationPermission()
    //     Notifications.presentLocalNotificationAsync({
    //         title: 'Your Reservation',
    //         body: 'Reservation for '+ date + ' requested',
    //         ios: {
    //             sound: true
    //         },
    //         android: {
    //             sound: true,
    //             vibrate: true,
    //             color: '#512DA8'
    //         }
    //     })
    // }

    render() {
        return (
            <>
                <StatusBar barStyle='dark-content'/>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            tabBarIcon: ({color, size}) => {
                                if (route.name ==='Home') {
                                    return (
                                        <Icon name={'home'} color={color} size={size} />
                                    )
                                } else if (route.name === 'Exposures') {
                                    return (
                                        <>
                                            <Icon name={'format-list-bulleted'} color={color} size={size} />
                                            {this.props.badgeNum > 0 && (
                                                <View style={styles.tabBadge}>
                                                    <Text style={styles.tabBadgeText}>
                                                        {this.props.badgeNum}
                                                    </Text>
                                                </View>
                                            )}
                                        </>
                                    )
                                } else if (route.name === 'Self-Report') {
                                    return (
                                        <Icon name={'comment-alert'} color={color} size={size} />
                                    )
                                }
                            }
                        })}
                        initialRouteName={this.props.initialRouteName}
                    >
                        <Tab.Screen name='Home' component={Home} initialParams={{styles: styles}} />
                        <Tab.Screen name='Exposures' component={Exposures} initialParams={{styles: styles}} />
                        <Tab.Screen name='Self-Report' component={SelfReport} initialParams={{styles: styles}} />
                        <Tab.Screen name='Debug' component={Debug} initialParams={{styles: styles}} />
                    </Tab.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default connect(mapStateToProps)(Trace)
