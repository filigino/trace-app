import React from 'react'
import {connect} from 'react-redux'
import ContactTracing from 'react-native-contact-tracing'
import {NativeEventEmitter, NativeModules, Text} from 'react-native'
import {StatusBar} from 'react-native'
import {FontAwesome, Foundation, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {styles} from '../../styles'
import Drinks from './Menu/Drinks'
import Food from './Menu/Food'
import Home from './Home'
import Menu from './Menu'
import SelfReport from './SelfReport'
import {logMyID, logOtherID, clearOldIDs} from '../../redux/ActionCreators'

const mapDispatchToProps = (dispatch) => ({
    logMyID: (id) => dispatch(logMyID(id)),
    logOtherID: (id) => dispatch(logOtherID(id)),
    clearOldIDs: () => dispatch(clearOldIDs()),
})

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

const MenuStack = createStackNavigator()

const MenuStackScreen = () => {
    return (
        <MenuStack.Navigator
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
            initialRouteName='Menu'
        >
            <MenuStack.Screen name='Menu' component={Menu}
                initialParams={{styles: styles}}
            />
            <MenuStack.Screen name='Drinks' component={Drinks}
                initialParams={{styles: styles}}
            />
            <MenuStack.Screen name='Food' component={Food}
                initialParams={{styles: styles}}
            />
        </MenuStack.Navigator>
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
            <SelfReportStack.Screen name='Self Report' component={SelfReport}
                initialParams={{styles: styles}}
            />
        </SelfReportStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

class Trace extends React.Component {
    componentDidMount() {
        const eventEmitter = new NativeEventEmitter(NativeModules.ContactTracing)
        this.advertiseListener = eventEmitter.addListener('Advertise', (id) => {
            this.props.logMyID(id)
        })
        this.discoveryListener = eventEmitter.addListener('Discovery', (id) => {
            this.props.logOtherID(id)
        })
        // ContactTracing.stop()
        // .then(() => ContactTracing.start())
    }

    componentWillUnmount() {
        this.advertiseListener.remove()
        this.discoveryListener.remove()
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
                                let iconName

                                if (route.name === 'Home') {
                                    return (
                                        <Ionicons name={'ios-information-circle'} size={size} color={color} />
                                    )
                                } else if (route.name === 'Menu') {
                                    return (
                                        <MaterialCommunityIcons name={'food-fork-drink'} size={size} color={color} />
                                    )
                                } else if (route.name === 'Self Report') {
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
                        initialRouteName='Self Report'
                    >
                        <Tab.Screen name='Home' component={HomeStackScreen} />
                        <Tab.Screen name='Menu' component={MenuStackScreen} />
                        <Tab.Screen name='Self Report' component={SelfReportStackScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
            </>
        )
    }
}

export default connect(null, mapDispatchToProps)(Trace)
