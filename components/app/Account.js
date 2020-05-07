import React, { Component } from 'react'
import {connect} from 'react-redux'
import {logOut} from '../../redux/ActionCreators'
import {Text, TouchableOpacity, View} from 'react-native'
import {CheckBox, Input} from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut())
})

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
        const {styles} = this.props.route.params
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
                    <Text style={{color: 'white'}}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{padding: 5, margin: 5, backgroundColor: '#6b52ae'}}
                    onPress={() => this.props.logOut()}
                >
                    <Text style={{color: 'white'}}>Log Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Account)
