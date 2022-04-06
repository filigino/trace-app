import React from 'react'
import {connect} from 'react-redux'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import {StatusBar, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Exposures from './Exposures'
import Home from './Home'
import SelfReport from './SelfReport'
import {styles} from '../../styles'

const Tab = createBottomTabNavigator()

const mapStateToProps = (state) => ({
    numberUnopened: state.exposures.numberUnopened,
    initialRouteName: state.launch.initialRouteName
})

class Trace extends React.Component {
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
                                            {this.props.numberUnopened > 0 && (
                                                <View style={styles.tabBadge}>
                                                    <Text style={styles.tabBadgeText}>
                                                        {this.props.numberUnopened}
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
                    </Tab.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default connect(mapStateToProps)(Trace)
