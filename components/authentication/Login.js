import React from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import {CheckBox} from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        // Returns promise
        SecureStore.getItemAsync('user_info')
            .then((userdata) => {
                // JSON objects stored in store...must convert to and from
                // JSON when accessing
                let userinfo = JSON.parse(userdata)
                if (userinfo) {
                    this.setState({username: userinfo.username})
                    this.setState({password: userinfo.password})
                    // Their info was previously remembered so keep
                    // remembering it
                    this.setState({remember: true})
                }
            })
    }

    handleLogin() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            // Returns promise
            SecureStore.setItemAsync(
                'user_info',
                JSON.stringify({ username: this.state.username, password: this.state.password })
            )
                .catch((error) => console.log('Could not save user info', error))
        } else {
            SecureStore.deleteItemAsync('user_info')
                .catch((error) => console.log('Could not save user info', error))
        }
    }

    // handleLogin() {
    //     return fetch('http://192.168.1.24:3000/users', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((res) => {
    //             if (res.headers.get('content-type') === 'text/plain') {
    //                 return res.text()
    //             } else if (res.headers.get('content-type').includes('application/json')) {
    //                 return res.json()
    //             }
    //         })
    //         .then((res) => console.log(res))
    // }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Username'
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    style={styles.textbox}
                />
                <TextInput
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    style={styles.textbox}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox} />
                <TouchableOpacity
                    style={styles.squaredButton}
                    onPress={() => this.handleLogin()}
                >
                    <Text style={{color: 'white'}}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.squaredButton}
                    onPress={() => {
                        this.props.navigation.jumpTo('UserInfo')
                    }}
                >
                    <Text style={{color: 'white'}}>Sign up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
