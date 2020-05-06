import React from 'react'
import {connect} from 'react-redux'
import {restoreToken} from '../../../redux/ActionCreators'
import * as SecureStore from 'expo-secure-store'
import {TouchableOpacity, View} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import * as RootNavigation from '../../../RootNavigation'
import {url} from '../../../url'

const mapStateToProps = (state) => ({
    signUpNextButton: state.signUpNextButton
})

const mapDispatchToProps = (dispatch) => ({
    restoreToken: (token) => dispatch(restoreToken(token))
})

const SignUpNextButton = (props) => {
    const nextSignupScreen = () => {
        const index = RootNavigation.navigationRef.current.getRootState().index
        const currentScreen = RootNavigation.navigationRef.current.getRootState().routes[index]
        const currentScreenName = currentScreen.name
        const params = currentScreen.params

        if (currentScreenName === 'UserInfo' && props.signUpNextButton.active) {
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
                    RootNavigation.jumpTo('BirthDate')
                    SecureStore.setItemAsync('token', res.token)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            SecureStore.getItemAsync('token')
            .then((token) => {
                if (currentScreenName === 'BirthDate') {
                    const {birthDate} = params
    
                    fetch(url + 'users', {
                        method: 'PUT',
                        headers: {
                            'Authorization': 'Bearer ' + token,
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
                } else if (currentScreenName === 'Sex' && props.signUpNextButton.active) {
                    const {sex} = params
    
                    fetch(url + 'users', {
                        method: 'PUT',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sex
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
                            RootNavigation.jumpTo('Ethnicity')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                } else if (currentScreenName === 'Ethnicity' && props.signUpNextButton.active) {
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
    
                    const {ethnicity} = params
                    fetch(url + 'users', {
                        method: 'PUT',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ethnicity
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
                            RootNavigation.jumpTo('Congrats')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                } else if (currentScreenName === 'Congrats') {
                    props.restoreToken(token)
                }
            })
        }
    }

    return (
        <View style={[
            props.styles.nextButtonPosition,
            {opacity: props.signUpNextButton.visible ? 1 : 0}
        ]}>
            <TouchableOpacity
                onPress={() => nextSignupScreen()}
                activeOpacity={props.signUpNextButton.opacity}
                style={[props.styles.roundButton, {backgroundColor: props.signUpNextButton.color}]}
            >
                <FontAwesome5 name={'chevron-right'} size={30} color='white' />
            </TouchableOpacity>
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpNextButton)
