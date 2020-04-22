import React from 'react'
import {Image, StyleSheet, Text} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {FontAwesome, Foundation, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import Account from './screens/Account'
import Drinks from './screens/Menu/Drinks'
import Food from './screens/Menu/Food'
import Home from './screens/Home'
import Locations from './screens/Locations'
import Menu from './screens/Menu'
import Splash from './Splash'
import {connect} from 'react-redux'
// import {fetchDrinks, fetchFood, fetchLocations} from '../redux/ActionCreators'

const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6b52ae'
                },
                headerTintColor: 'white',
                headerTitle: 
                    <Text>Contact</Text>
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
                    backgroundColor: '#6b52ae'
                },
                headerTintColor: 'white',
                headerTitle: 
                    <Text>Contact</Text>
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

const LocationsStack = createStackNavigator()

const LocationsStackScreen = () => {
    return (
        <LocationsStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6b52ae'
                },
                headerTintColor: 'white',
                headerTitle: 
                    <Text>Contact</Text>
            }}
        >
            <LocationsStack.Screen name='Locations' component={Locations}
                initialParams={{styles: styles}}
            />
        </LocationsStack.Navigator>
    )
}

const AccountStack = createStackNavigator()

const AccountStackScreen = () => {
    return (
        <AccountStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6b52ae'
                },
                headerTintColor: 'white',
                headerTitle: 
                    <Text>Contact</Text>
            }}
        >
            <AccountStack.Screen name='Account' component={Account}
                initialParams={{styles: styles}}
            />
        </AccountStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

const mapDispatchToProps = (dispatch) => ({
        // fetchDrinks: () => dispatch(fetchDrinks()),
        // fetchFood: () => dispatch(fetchFood()),
        // fetchLocations: () => dispatch(fetchLocations())
})

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSplash: false
        }
    }

    // componentDidMount() {
    //     this.props.fetchDrinks()
    //     this.props.fetchFood()
    //     this.props.fetchLocations()
    // }

    hideSplash() {
        this.setState({showSplash: false})
    }

    render() {
        if (this.state.showSplash) {
            return (
                <Splash styles={styles} hideSplash={() => this.hideSplash()} />
            )
        } else {
            return (
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({route}) => ({
                            // add 'focused' as argument if needed for switching icons when focused/not
                            tabBarIcon: ({color, size}) => {
                                let iconName

                                if (route.name === 'Home') {
                                    iconName = 'ios-information-circle'
                                    return (
                                        <Ionicons name={iconName} size={size} color={color} />
                                    )
                                } else if (route.name === 'Menu') {
                                    iconName = 'food-fork-drink'
                                    return (
                                        <MaterialCommunityIcons name={iconName} size={size} color={color} />
                                    )
                                } else if (route.name === 'Locations') {
                                    iconName = 'magnifying-glass'
                                    return (
                                        <Foundation name={iconName} size={size} color={color} />
                                    )
                                } else if (route.name === 'Account') {
                                    iconName = 'user-circle-o'
                                    return (
                                        <FontAwesome name={iconName} size={size} color={color} />
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
                        <Tab.Screen name='Menu' component={MenuStackScreen} />
                        <Tab.Screen name='Locations' component={LocationsStackScreen} />
                        <Tab.Screen name='Account' component={AccountStackScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
            )
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenText: {
        color: 'black'
    }
})

export default connect(null, mapDispatchToProps)(Main)
