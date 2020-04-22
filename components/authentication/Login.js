import React from 'react'
import {Text, TextInput, TouchableHighlight, View} from 'react-native'
import {CheckBox} from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'

class Login extends React.Component {
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

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Username'
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    style={styles.textBox}
                />
                <TextInput
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    style={styles.textBox}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox} />
                <TouchableHighlight
                    style={{padding: 5, margin: 5, backgroundColor: '#6b52ae'}}
                    underlayColor={'purple'}
                    onPress={() => this.handleLogin()}
                >
                    <Text style={{color: 'white'}}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={{padding: 5, margin: 5, backgroundColor: '#6b52ae'}}
                    underlayColor={'purple'}
                    onPress={() => this.props.navigation.push('UserInfo')}
                >
                    <Text style={{color: 'white'}}>Sign up</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default Login
