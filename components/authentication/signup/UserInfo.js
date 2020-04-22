import React from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                            this.props.navigation.setParams({username: input.nativeEvent.text})
                        }}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='ascii-capable'
                        style={styles.textBox}
                    />
                    <TouchableOpacity
                        onPress={() => this.togglePasswordVisibility()}
                        style={styles.textBoxButtonRightPosition}
                    >
                        <FontAwesome5
                            color={'gray'}
                            name={this.state.hidePassword ? 'exclamation' : 'exclamation'}
                            size={25}
                        />
                    </TouchableOpacity>
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
                        style={styles.textBoxButtonRightPosition}
                    >
                        <FontAwesome5
                            color={'gray'}
                            name={this.state.hidePassword ? 'eye-slash' : 'eye'}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder='Email'
                    onEndEditing={(input) => {
                        this.props.navigation.setParams({email: input.nativeEvent.text})
                    }}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    style={styles.textBox}
                />
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
                            this.props.route.params.username
                            && this.props.route.params.password
                            && this.props.route.params.email
                            && this.props.route.params.firstName
                            && this.props.route.params.lastName ? '#624480': 'gray'
                        }]}
                        activeOpacity={
                            this.props.route.params.username
                            && this.props.route.params.password
                            && this.props.route.params.email
                            && this.props.route.params.firstName
                            && this.props.route.params.lastName ? 0.2 : 1
                        }
                        onPress={
                            // this.props.route.params.username
                            // && this.props.route.params.password
                            // && this.props.route.params.email
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
