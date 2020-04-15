import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CheckBox, Input } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'

class Account extends Component {
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
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not save user info', error))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput} />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput} />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox} />
                <TouchableOpacity
                    style={{padding: 5, margin: 5, backgroundColor: '#6b52ae'}}
                    onPress={() => this.handleLogin()}
                >
                    <Text style={{color: 'white'}}>Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formInput: {
        marginVertical: 20
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
})

export default Account
