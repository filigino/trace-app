import React from 'react'
import {connect} from 'react-redux'
import {activateButton, deactivateButton, showButton} from '../../../redux/ActionCreators'
import {Alert, ScrollView, TextInput, TouchableOpacity, View} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {url} from '../../../url'

const mapDispatchToProps = (dispatch) => ({
    activateButton: () => dispatch(activateButton()),
    deactivateButton: () => dispatch(deactivateButton()),
    showButton: () => dispatch(showButton())
})

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameAvailable: false,
            passwordValid: false,
            emailAvailable: false,
            hidePassword: true,
            usernameStarted: false,
            passwordStarted: false,
            emailStarted: false,
        }
    }

    componentDidMount() {
        this.props.deactivateButton()
        this.props.showButton()    
    }

    checkUsernameAvailability(text) {
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
                    this.setState({usernameAvailable: true})
                    this.props.navigation.setParams({username: text})
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
    }

    checkEmailAvailability(text) {
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
                    this.setState({emailAvailable: true})
                    this.props.navigation.setParams({email: text})
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
    }

    togglePasswordVisibility() {
        this.setState({hidePassword: !this.state.hidePassword})
    }

    validatePassword(text) {
        this.setState({passwordStarted: true})
        if (text && !text.includes(' ') && text.length >= 8) {
            this.setState({passwordValid: true}, () => this.styleButton())
            this.props.navigation.setParams({password: text})
        } else {
            this.setState({passwordValid: false}, () => this.styleButton())
        }
    }

    styleButton() {
        if (this.state.usernameAvailable && this.state.passwordValid && this.state.emailAvailable) {
            this.props.activateButton()
        } else {
            this.props.deactivateButton()
        }
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <TextInput
                            placeholder='Username'
                            onChangeText={(text) => this.checkUsernameAvailability(text)}
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
                            style={styles.textbox}
                        />
                        {this.state.usernameStarted && (
                            <FontAwesome5
                                color={this.state.usernameAvailable ? 'green' : 'red'}
                                name={this.state.usernameAvailable ? 'check-circle' : 'times-circle'}
                                size={25}
                                style={styles.textboxIconPositionA}
                            />
                        )}
                    </View>
                    <View>
                        <TextInput
                            placeholder='Password (min. 8 chars)'
                            onChangeText={(text) => this.validatePassword(text)}
                            secureTextEntry={this.state.hidePassword}
                            style={styles.textbox}
                            textContentType='password'
                        />
                        <TouchableOpacity
                            onPress={() => this.togglePasswordVisibility()}
                            style={styles.textboxIconPositionB}
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
                                style={styles.textboxIconPositionA}
                            />
                        )}
                    </View>
                    <View>
                        <TextInput
                            placeholder='Email'
                            onChangeText={(text) => this.checkEmailAvailability(text)}
                            onEndEditing={(input) => {
                                const text = input.nativeEvent.text
                                if (!text.includes('@') || !text.includes('.')) {
                                    this.setState({emailAvailable: false}, () => this.styleButton())
                                }
                            }}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='email-address'
                            style={styles.textbox}
                        />
                        {this.state.emailStarted && (
                            <FontAwesome5
                                color={this.state.emailAvailable ? 'green' : 'red'}
                                name={this.state.emailAvailable ? 'check-circle' : 'times-circle'}
                                size={25}
                                style={styles.textboxIconPositionA}
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
                        style={styles.textbox}
                    />
                    <TextInput
                        placeholder='Last name (optional)'
                        onEndEditing={(input) => {
                            this.props.navigation.setParams({lastName: input.nativeEvent.text.trim()})
                        }}
                        autoCapitalize='words'
                        autoCorrect={false}
                        keyboardType='ascii-capable'
                        style={styles.textbox}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(UserInfo)
