import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {NavigationContainer} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as SecureStore from 'expo-secure-store'
import * as RootNavigation from './RootNavigation'
import BirthDate from './authentication/signup/BirthDate'
import Congrats from './authentication/signup/Congrats'
import Ethnicity from './authentication/signup/Ethnicity'
import Login from './authentication/Login'
import Sex from './authentication/signup/Sex'
import UserInfo from './authentication/signup/UserInfo'
import {styles} from '../styles'
import {url} from '../url'
import {connect} from 'react-redux'
import {activateButton, hideButton} from '../redux/ActionCreators'

const Tab = createMaterialTopTabNavigator()

const mapStateToProps = (state) => ({
    nextButton: state.nextButton
})

const mapDispatchToProps = (dispatch) => ({
    activateButton: () => dispatch(activateButton()),
    hideButton: () => dispatch(hideButton())
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

        if (currentScreenName === 'UserInfo' && this.props.nextButton.active) {
            RootNavigation.jumpTo('BirthDate', params)
            // const {username} = params
            // const {password} = params
            // const {email} = params
            // const {firstName} = params
            // const {lastName} = params

            // fetch(url + 'users/signup', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         username,
            //         password,
            //         email,
            //         firstName,
            //         lastName
            //     })
            // })
            // .then((res) => {
            //     if (res.headers.get('content-type').includes('application/json')) {
            //         return res.json()
            //     } else if (res.headers.get('content-type') === 'text/plain') {
            //         return res.text()
            //     }
            // })
            // .then((res) => {
            //     if (res.success) {
            //         SecureStore.setItemAsync(
            //             'token',
            //             JSON.stringify({ username: this.state.username, password: this.state.password })
            //         )
            //             .catch((error) => console.log('Could not save user info', error))
            //     }
            // })
            // .then(RootNavigation.jumpTo('BirthDate'))
            // .catch((err) => {
            //     console.log(err)
            // })
        } else if (currentScreenName === 'BirthDate') {
            RootNavigation.jumpTo('Sex', params)
        } else if (currentScreenName === 'Sex') {
            this.props.nextButton.active ?
                RootNavigation.jumpTo('Ethnicity', params)
            :
                {}
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
            this.props.nextButton.active ?
                RootNavigation.jumpTo('Congrats', params)
            :
                {}
        } else if (currentScreenName === 'Congrats') {
            const {birthDate} = params
            const {sex} = params
            const {ethnicity} = params
        }
    }

    render() {
        return (
            <>
                <NavigationContainer ref={RootNavigation.navigationRef}>
                    <Tab.Navigator
                        initialRouteName='Login'
                        lazy={true}
                        // swipeEnabled={false}
                        tabBarPosition={null}
                    >
                        <Tab.Screen name='Login' component={Login}
                            initialParams={{styles: styles}}
                        />
                        <Tab.Screen name='UserInfo' component={UserInfo}
                            initialParams={{styles: styles}}
                        />
                        <Tab.Screen name='BirthDate' component={BirthDate}
                            initialParams={{styles: styles}}
                        />
                        <Tab.Screen name='Sex' component={Sex}
                            initialParams={{styles: styles}}
                        />
                        <Tab.Screen name='Ethnicity' component={Ethnicity}
                            initialParams={{styles: styles}}
                        />
                        <Tab.Screen name='Congrats' component={Congrats}
                            initialParams={{styles: styles}}
                        />
                    </Tab.Navigator>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)
