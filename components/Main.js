import React from 'react'
import {StyleSheet} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack'
import BirthDate from './authentication/signup/BirthDate'
import Confirm from './authentication/signup/Confirm'
import Ethnicity from './authentication/signup/Ethnicity'
import Login from './authentication/Login'
import Sex from './authentication/signup/Sex'
import UserInfo from './authentication/signup/UserInfo'

const Stack = createStackNavigator()

class Main extends React.Component {
    handleLogin() {
        return fetch('http://192.168.1.24:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.headers.get('content-type') === 'text/plain') {
                    return res.text()
                } else if (res.headers.get('content-type').includes('application/json')) {
                    return res.json()
                }
            })
            .then((res) => console.log(res))
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='UserInfo'
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: 'rebeccapurple'
                        },
                        headerTintColor: 'white'
                    }}
                >
                    <Stack.Screen name='BirthDate' component={BirthDate}
                        initialParams={{styles: styles}}
                        options={{
                            title: '',
                            gestureEnabled: false
                        }}
                    />
                    <Stack.Screen name='Confirm' component={Confirm}
                        initialParams={{styles: styles}}
                        options={({navigation}) => ({
                            title: 'Confirm',
                            gestureEnabled: false,
                            headerBackTitle: '',
                            headerLeft: () => (
                                <HeaderBackButton
                                    onPress={() => navigation.navigate('Ethnicity', {ethnicity: []})}
                                    tintColor='white'
                                />
                            )
                        })}
                    />
                    <Stack.Screen name='Ethnicity' component={Ethnicity}
                        initialParams={{ethnicity: [], styles: styles}}
                        options={{
                            title: 'Profile',
                            gestureEnabled: false,
                            headerBackTitle: ''
                        }}
                    />
                    <Stack.Screen name='Login' component={Login}
                        initialParams={{styles: styles}}
                    />
                    <Stack.Screen name='Sex' component={Sex}
                        initialParams={{styles: styles}}
                        options={{
                            title: 'Profile',
                            gestureEnabled: false,
                            headerBackTitle: ''
                        }}
                    />
                    <Stack.Screen name='UserInfo' component={UserInfo}
                        initialParams={{styles: styles}}
                        options={{
                            title: '',
                            gestureEnabled: false,
                            headerLeft: null
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    checkButton: {
        margin: 5,
        paddingHorizontal: 5,
        height: 40
    },
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: 'white'
    },
    nextButtonPosition: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    roundButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: 'rebeccapurple',
        borderRadius: 35
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenText: {
        color: 'black'
    },
    textBox: {
        margin: 5,
        paddingHorizontal: 5,
        height: 40,
        borderBottomWidth: 2,
        borderColor: 'lightgray'
    },
    textBoxButtonRightPosition: {
        bottom: 15,
        position: 'absolute',
        right: 10
    },
    xorButton: {
        flex: 1/2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70
    }
})

export default Main
