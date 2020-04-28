import React from 'react'
import {Alert, TextInput, TouchableOpacity, View} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {url} from '../../../url'
import {connect} from 'react-redux'
import {styleButton} from '../../../redux/ActionCreators'

const mapDispatchToProps = (dispatch) => ({
    styleButton: (color, opacity, active) => dispatch(styleButton(color, opacity, active))
})

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameStarted: false,
            passwordStarted: false,
            emailStarted: false,
            usernameAvailable: false,
            passwordValid: false,
            emailAvailable: false,
            hidePassword: true
            
        }
    }

    styleButton() {
        let color
        let opacity
        let active
        if (this.state.usernameAvailable && this.state.passwordValid && this.state.emailAvailable) {
            color = '#624480'
            opacity = 0.2
            active = true
        } else {
            color = 'gray'
            opacity = 1
            active = false
        }
        this.props.styleButton(color, opacity, active)
    }

    togglePasswordVisibility() {
        this.setState({hidePassword: !this.state.hidePassword})
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <View>
                    <TextInput
                        placeholder='Username'
                        onChangeText={(text) => {
                            this.setState({usernameStarted: true})
                            if (text && !text.includes(' ')) {
                                fetch(url + 'users/username_availability', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        username: text
                                    })
                                })
                                .then((res) => res.json())
                                .then((res) => {
                                    if (res.success) {
                                        this.props.navigation.setParams({username: text})
                                        this.setState({usernameAvailable: true})
                                    } else {
                                        this.setState({usernameAvailable: false})
                                    }
                                })
                                .then(() => this.styleButton())
                                .catch((err) => {
                                    Alert.alert(
                                        'Could not connect to server',
                                        'Required to check username availability'
                                    )
                                    console.log(err)
                                })
                            } else {
                                this.setState({usernameAvailable: false}, () => this.styleButton())
                            }
                        }}
                        onEndEditing={(input) => {
                            const text = input.nativeEvent.text
                            if (!text) {
                                this.setState({usernameAvailable: false}, () => this.styleButton())
                            }
                        }}
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType='ascii-capable'
                        maxLength={15}
                        style={styles.textBox}
                    />
                    {this.state.usernameStarted && (
                        <FontAwesome5
                            color={this.state.usernameAvailable ? 'green' : 'red'}
                            name={this.state.usernameAvailable ? 'check-circle' : 'times-circle'}
                            size={25}
                            style={styles.availableIconPosition}
                        />
                    )}
                </View>
                <View>
                    <TextInput
                        placeholder='Password (min. 8 chars)'
                        onChangeText={(text) => {
                            this.setState({passwordStarted: true})
                            if (text && !text.includes(' ') && text.length >= 8) {
                                this.props.navigation.setParams({password: text})
                                this.setState({passwordValid: true}, () => this.styleButton())
                            } else {
                                this.setState({passwordValid: false}, () => this.styleButton())
                            }
                        }}
                        secureTextEntry={this.state.hidePassword}
                        style={styles.textBox}
                        textContentType='password'
                    />
                    <TouchableOpacity
                        onPress={() => this.togglePasswordVisibility()}
                        style={styles.hiddenIconPosition}
                    >
                        <FontAwesome5
                            color={'gray'}
                            name={this.state.hidePassword ? 'eye-slash' : 'eye'}
                            size={25}
                        />
                    </TouchableOpacity>
                    {this.state.passwordStarted && (
                        <FontAwesome5
                            color={this.state.passwordValid ? 'green' : 'red'}
                            name={this.state.passwordValid ? 'check-circle' : 'times-circle'}
                            size={25}
                            style={styles.availableIconPosition}
                        />
                    )}
                </View>
                <View>
                    <TextInput
                        placeholder='Email'
                        onChangeText={(text) => {
                            this.setState({emailStarted: true})
                            if (text && text.includes('@') && text.includes('.') && !text.includes(' ')) {
                                fetch(url + 'users/email_availability', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        email: text
                                    })
                                })
                                .then((res) => res.json())
                                .then((res) => {
                                    if (res.success) {
                                        this.props.navigation.setParams({email: text})
                                        this.setState({emailAvailable: true})
                                    } else {
                                        this.setState({emailAvailable: false})
                                    }
                                })
                                .then(() => this.styleButton())
                                .catch((err) => {
                                    Alert.alert(
                                        'Could not connect to server',
                                        'Required to check email availability'
                                    )
                                    console.log(err)
                                })
                            } else {
                                this.setState({emailAvailable: false}, () => this.styleButton())
                            }
                        }}
                        onEndEditing={(input) => {
                            const text = input.nativeEvent.text
                            if (!text.includes('@') || !text.includes('.')) {
                                this.setState({emailAvailable: false}, () => this.styleButton())
                            }
                        }}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='email-address'
                        style={styles.textBox}
                    />
                    {this.state.emailStarted && (
                        <FontAwesome5
                            color={this.state.emailAvailable ? 'green' : 'red'}
                            name={this.state.emailAvailable ? 'check-circle' : 'times-circle'}
                            size={25}
                            style={styles.availableIconPosition}
                        />
                    )}
                </View>
                <TextInput
                    placeholder='First name (optional)'
                    onEndEditing={(input) => {
                        this.props.navigation.setParams({firstName: input.nativeEvent.text.trim()})
                    }}
                    autoCapitalize='words'
                    autoCorrect={false}
                    keyboardType='ascii-capable'
                    style={styles.textBox}
                />
                <TextInput
                    placeholder='Last name (optional)'
                    onEndEditing={(input) => {
                        this.props.navigation.setParams({lastName: input.nativeEvent.text.trim()})
                    }}
                    autoCapitalize='words'
                    autoCorrect={false}
                    keyboardType='ascii-capable'
                    style={styles.textBox}
                />
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(UserInfo)
