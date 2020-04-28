import React from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack'
import * as RootNavigation from './RootNavigation'
import BirthDate from './authentication/signup/BirthDate'
import Confirm from './authentication/signup/Confirm'
import Ethnicity from './authentication/signup/Ethnicity'
import Login from './authentication/Login'
import Sex from './authentication/signup/Sex'
import UserInfo from './authentication/signup/UserInfo'
import {connect} from 'react-redux'
import {toggleButtonVisibility} from '../redux/ActionCreators'

const Stack = createStackNavigator()

const mapStateToProps = (state) => ({
    nextButton: state.nextButton
})

const mapDispatchToProps = (dispatch) => ({
    hideButton: () => dispatch(toggleButtonVisibility(false))
})

class Main extends React.Component {
    componentDidMount() {
        this.props.hideButton()
    }

    nextSignupScreen() {
        const index = RootNavigation.navigationRef.current.getRootState().index
        const currentScreen = RootNavigation.navigationRef.current.getRootState().routes[index]
        const currentScreenName = currentScreen.name
        const params = currentScreen.params

        if (currentScreenName === 'UserInfo') {
            this.props.nextButton.active ?
                RootNavigation.push('BirthDate', params)
            :
                {}
        } else if (currentScreenName === 'BirthDate') {
            RootNavigation.push('Sex', params)
        } else if (currentScreenName === 'Sex') {
            RootNavigation.push('Ethnicity', params)
        } else if (currentScreenName === 'Ethnicity') {
            if (params.americanIndian) {
                params.ethnicity.push('American Indian')
            }
            if (params.black) {
                params.ethnicity.push('Black/African Descent')
            }
            if (params.eastAsian) {
                params.ethnicity.push('East Asian')
            }
            if (params.hispanicLatino) {
                params.ethnicity.push('Hispanic/Latino')
            }
            if (params.middleEastern) {
                params.ethnicity.push('Middle Eastern')
            }
            if (params.pacificIslander) {
                params.ethnicity.push('Pacific Islander')
            }
            if (params.southAsian) {
                params.ethnicity.push('South Asian')
            }
            if (params.white) {
                params.ethnicity.push('White/Caucasian')
            }
            if (params.other) {
                params.ethnicity.push('Other')
            }
            RootNavigation.push('Confirm', params)
        }
    }

    render() {
        return (
            <>
                <NavigationContainer ref={RootNavigation.navigationRef}>
                    <Stack.Navigator
                        initialRouteName='Login'
                        screenOptions={{
                            gestureEnabled: false,
                            headerBackTitle: '',
                            headerStyle: {
                                backgroundColor: 'rebeccapurple'
                            },
                            headerTintColor: 'white',
                            title: ''
                        }}
                    >
                        <Stack.Screen name='BirthDate' component={BirthDate}
                            initialParams={{styles: styles}}
                        />
                        <Stack.Screen name='Confirm' component={Confirm}
                            initialParams={{styles: styles}}
                            options={({navigation}) => ({
                                headerLeft: () => (
                                    <HeaderBackButton
                                        onPress={() => navigation.navigate('Ethnicity', {ethnicity: []})}
                                        tintColor='white'
                                    />
                                ),
                                title: 'Confirm'
                            })}
                        />
                        <Stack.Screen name='Ethnicity' component={Ethnicity}
                            initialParams={{styles: styles}}
                        />
                        <Stack.Screen name='Login' component={Login}
                            initialParams={{styles: styles}}
                        />
                        <Stack.Screen name='Sex' component={Sex}
                            initialParams={{styles: styles}}
                        />
                        <Stack.Screen name='UserInfo' component={UserInfo}
                            initialParams={{styles: styles}}
                            options={({navigation}) => ({
                                headerLeft: () => (
                                    <HeaderBackButton
                                        onPress={() => {
                                            this.props.hideButton()
                                            navigation.navigate('Login')
                                        }}
                                        tintColor='white'
                                    />
                                )
                            })}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
                <View style={[
                    styles.nextButtonPosition,
                    {opacity: this.props.nextButton.visible ? 1 : 0}
                ]}>
                    <TouchableOpacity
                        onPress={() => this.nextSignupScreen()}
                        activeOpacity={this.props.nextButton.opacity}
                        style={[styles.roundButton, {backgroundColor: this.props.nextButton.color}]}
                    >
                        <FontAwesome5 name={'chevron-right'} size={30} color='white' />
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    availableIconPosition: {
        bottom: 15,
        position: 'absolute',
        right: 12
    },
    checkButton: {
        height: 40,
        margin: 5,
        paddingHorizontal: 5
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 40
    },
    hiddenIconPosition: {
        bottom: 15,
        position: 'absolute',
        right: 10
    },
    nextButtonPosition: {
        alignItems: 'flex-end',
        margin: 40
    },
    roundButton: {
        alignItems: 'center',
        backgroundColor: '#624480',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 35,
        borderWidth: 1,
        height: 70,
        justifyContent: 'center',
        width: 70
    },
    screen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    screenText: {
        color: 'black'
    },
    squaredButton: {
        alignItems: 'center',
        backgroundColor: '#624480',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        width: 100
    },
    textBox: {
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        height: 40,
        margin: 5,
        paddingHorizontal: 5,
    },
    xorButton: {
        alignItems: 'center',
        flex: 1/2,
        height: 70,
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
