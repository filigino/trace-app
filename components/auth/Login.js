import React from 'react'
import {connect} from 'react-redux'
import {hideButton, logIn} from '../../redux/ActionCreators'
import * as SecureStore from 'expo-secure-store'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import {CheckBox} from 'react-native-elements'
import {FontAwesome5} from '@expo/vector-icons'

const mapDispatchToProps = (dispatch) => ({
    hideButton: () => dispatch(hideButton()),
    logIn: (username, password, rememberMe) => dispatch(logIn(username, password, rememberMe))
})

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hidePassword: true,
            rememberMe: false
        }
    }

    componentDidMount() {
        this.props.hideButton()
        SecureStore.getItemAsync('userLogin')
        .then((userLogin) => JSON.parse(userLogin))
        .then((userLogin) => {
            if (userLogin) {
                this.setState({username: userLogin.username})
                this.setState({password: userLogin.password})
                this.setState({rememberMe: true})
            }
        })
    }

    togglePasswordVisibility() {
        this.setState({hidePassword: !this.state.hidePassword})
    }

    handleLogin() {
        if (this.state.username && this.state.password) {
            this.props.logIn(this.state.username, this.state.password, this.state.rememberMe)
        }
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={[styles.container, {justifyContent: 'center'}]}>
                <TextInput
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='ascii-capable'
                    maxLength={15}
                    onChangeText={(username) => this.setState({username})}
                    style={styles.textbox}
                    value={this.state.username}
                />
                <View>
                    <TextInput
                        placeholder='Password'
                        onChangeText={(password) => this.setState({password})}
                        secureTextEntry={this.state.hidePassword}
                        style={styles.textbox}
                        textContentType='password'
                        value={this.state.password}
                    />
                    <TouchableOpacity
                        onPress={() => this.togglePasswordVisibility()}
                        style={styles.textboxIconPositionA}
                    >
                        <FontAwesome5
                            color={'gray'}
                            name={this.state.hidePassword ? 'eye-slash' : 'eye'}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
                <CheckBox
                    title='Remember Me'
                    onPress={() => this.setState({rememberMe: !this.state.rememberMe})}
                    center
                    checked={this.state.rememberMe}
                    containerStyle={styles.formCheckbox}
                />
                <TouchableOpacity
                    onPress={() => this.handleLogin()}
                    style={styles.squaredButton}
                >
                    <Text style={{color: 'white'}}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.jumpTo('UserInfo')}
                    style={styles.squaredButton}
                >
                    <Text style={{color: 'white'}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Login)
