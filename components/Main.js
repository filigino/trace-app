import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import * as SecureStore from 'expo-secure-store'
import * as RootNavigation from '../RootNavigation'
import BirthDate from './authentication/signup/BirthDate'
import Congrats from './authentication/signup/Congrats'
import Ethnicity from './authentication/signup/Ethnicity'
import Login from './authentication/Login'
import NextButton from './authentication/NextButton'
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
    constructor(props) {
        super(props)
        this.state = {
            token: ''
        }
    }

    componentDidMount() {
        this.props.hideButton()
    }

    nextSignupScreen() {
        const index = RootNavigation.navigationRef.current.getRootState().index
        const currentScreen = RootNavigation.navigationRef.current.getRootState().routes[index]
        const currentScreenName = currentScreen.name
        const params = currentScreen.params

        if (currentScreenName === 'UserInfo' && this.props.nextButton.active) {
            const {username} = params
            const {password} = params
            const {email} = params
            const {firstName} = params
            const {lastName} = params

            fetch(url + 'users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    firstName,
                    lastName
                })
            })
            .then((res) => {
                if (res.headers.get('content-type').includes('application/json')) {
                    return res.json()
                } else if (res.headers.get('content-type') === 'text/plain') {
                    return res.text()
                }
            })
            .then((res) => {
                if (res.success) {
                    this.setState({token: res.token}, () => RootNavigation.jumpTo('BirthDate'))
                    SecureStore.setItemAsync('token', res.token)
                        .catch((error) => console.log('Could not save token', error))
                }
            })
            .catch((err) => {
                console.log(err)
            })
        } else if (currentScreenName === 'BirthDate') {
            const {birthDate} = params

            fetch(url + 'users', {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    birthDate
                })
            })
            .then((res) => {
                if (res.headers.get('content-type').includes('application/json')) {
                    return res.json()
                } else if (res.headers.get('content-type') === 'text/plain') {
                    return res.text()
                }
            })
            .then((res) => {
                if (res.success) {
                    RootNavigation.jumpTo('Sex')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        } else if (currentScreenName === 'Sex') {
            this.props.nextButton.active ?
                RootNavigation.jumpTo('Ethnicity')
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
                RootNavigation.jumpTo('Congrats')
            :
                {}
        } else if (currentScreenName === 'Congrats') {
        }
    }

    render() {
        return (
            <>
                <NavigationContainer ref={RootNavigation.navigationRef}>
                    <Tab.Navigator
                        backBehavior='order'
                        initialRouteName='Login'
                        lazy={true}
                        swipeEnabled={false}
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
                <NextButton onPress={() => this.nextSignupScreen()} styles={styles} />
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
