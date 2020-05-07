import React from 'react'
import {connect} from 'react-redux'
import {Text} from 'react-native'
import {FontAwesome, Foundation, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {styles} from '../../styles'
import Account from './Account'
import Drinks from './Menu/Drinks'
import Food from './Menu/Food'
import Home from './Home'
import Locations from './Locations'
import Menu from './Menu'

// import {fetchDrinks, fetchFood, fetchLocations} from '../redux/ActionCreators'

const mapDispatchToProps = (dispatch) => ({
    // fetchDrinks: () => dispatch(fetchDrinks()),
    // fetchFood: () => dispatch(fetchFood()),
    // fetchLocations: () => dispatch(fetchLocations())
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

const LocationsStack = createStackNavigator()

const LocationsStackScreen = () => {
    return (
        <LocationsStack.Navigator
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
            <AccountStack.Screen name='Account' component={Account}
                initialParams={{styles: styles}}
            />
        </AccountStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

class Trace extends React.Component {
    // componentDidMount() {
    //     this.props.fetchDrinks()
    //     this.props.fetchFood()
    //     this.props.fetchLocations()
    // }

    render() {
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

export default connect(null, mapDispatchToProps)(Trace)
