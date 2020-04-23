import React from 'react'
import {TextInput, TouchableOpacity, View} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {url} from '../../../url'

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameAvailable: false,
            emailAvailable: false,
            hidePassword: true
        }
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
                        onEndEditing={(input) => {
                            if (input.nativeEvent.text) {
                                this.props.navigation.setParams({username: input.nativeEvent.text})
                                fetch(url + 'users/username_availability', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        username: input.nativeEvent.text
                                    })
                                })
                                .then((res) => res.json())
                                .then((res) => {
                                    if (res.success) {
                                        this.setState({usernameAvailable: true})
                                    } else {
                                        this.setState({usernameAvailable: false})
                                    }
                                })
                                .catch((err) => {
                                    console.error(err)
                                })
                            } else {
                                this.setState({usernameAvailable: false})
                            }
                        }}
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType='ascii-capable'
                        style={styles.textBox}
                    />
                    {this.props.route.params.username && (
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
                        placeholder='Password'
                        onEndEditing={(input) => {
                            this.props.navigation.setParams({password: input.nativeEvent.text})
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
                </View>
                <View>
                    <TextInput
                        placeholder='Email'
                        onEndEditing={(input) => {
                            if (input.nativeEvent.text) {
                                this.props.navigation.setParams({email: input.nativeEvent.text})
                                if (input.nativeEvent.text.includes('@')) {
                                    fetch(url + 'users/email_availability', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            email: input.nativeEvent.text
                                        })
                                    })
                                    .then((res) => res.json())
                                    .then((res) => {
                                        if (res.success) {
                                            this.setState({emailAvailable: true})
                                        } else {
                                            this.setState({emailAvailable: false})
                                        }
                                    })
                                    .catch((err) => {
                                        console.error(err)
                                    })
                                }
                            } else {
                                this.setState({emailAvailable: false})
                            }
                        }}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='email-address'
                        style={styles.textBox}
                    />
                    {this.props.route.params.email && (
                        <FontAwesome5
                            color={this.state.emailAvailable ? 'green' : 'red'}
                            name={this.state.emailAvailable ? 'check-circle' : 'times-circle'}
                            size={25}
                            style={styles.availableIconPosition}
                        />
                    )}
                </View>
                <TextInput
                    placeholder='First name'
                    onEndEditing={(input) => {
                        this.props.navigation.setParams({firstName: input.nativeEvent.text})
                    }}
                    autoCapitalize='words'
                    autoCorrect={false}
                    keyboardType='ascii-capable'
                    style={styles.textBox}
                />
                <TextInput
                    placeholder='Last name'
                    onEndEditing={(input) => {
                        this.props.navigation.setParams({lastName: input.nativeEvent.text})
                    }}
                    autoCapitalize='words'
                    autoCorrect={false}
                    keyboardType='ascii-capable'
                    style={styles.textBox}
                />
                <View style={styles.nextButtonPosition}>
                    <TouchableOpacity
                        style={[styles.roundButton, {backgroundColor: 
                            this.state.usernameAvailable
                            && this.props.route.params.password
                            && this.state.emailAvailable
                            && this.props.route.params.firstName
                            && this.props.route.params.lastName ? '#624480': 'gray'
                        }]}
                        activeOpacity={
                            this.state.usernameAvailable
                            && this.props.route.params.password
                            && this.state.emailAvailable
                            && this.props.route.params.firstName
                            && this.props.route.params.lastName ? 0.2 : 1
                        }
                        onPress={
                            // this.state.usernameAvailable
                            // && this.props.route.params.password
                            // && this.state.emailAvailable
                            // && this.props.route.params.firstName
                            // && this.props.route.params.lastName ?
                                () => this.props.navigation.push('BirthDate', this.props.route.params)
                            // :
                            //     () => {}
                        }
                    >
                        <FontAwesome5 name={'chevron-right'} size={30} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
