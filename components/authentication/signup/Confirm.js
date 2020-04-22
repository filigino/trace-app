import React from 'react'
import {Text, TextInput, TouchableHighlight, TouchableOpacity, View, Icon} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {FontAwesome} from '@expo/vector-icons'

const Confirm = (props) => {
    const {username} = props.route.params
    const {password} = props.route.params
    const {email} = props.route.params
    const {firstName} = props.route.params
    const {lastName} = props.route.params
    const {birthDate} = props.route.params
    const {sex} = props.route.params
    const {ethnicity} = props.route.params
    const {styles} = props.route.params
    return (
        <View style={styles.container}>
            <Text>{username}</Text>
            <Text>{email}</Text>
            <Text>{firstName}</Text>
            <Text>{lastName}</Text>
            <Text>{birthDate}</Text>
            <Text>{sex}</Text>
            <Text>{ethnicity}</Text>
            <View style={styles.nextButtonPosition}>
                <TouchableHighlight
                    style={styles.roundButton}
                    underlayColor={'purple'}
                    onPress={() => {
                        fetch('http://192.168.1.24:3000/users/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                username,
                                password,
                                email,
                                firstName,
                                lastName,
                                birthDate,
                                sex,
                                ethnicity
                            })
                        })
                        .then((res) => {
                            if (res.headers.get('content-type') === 'text/plain') {
                                return res.text()
                            } else if (res.headers.get('content-type').includes('application/json')) {
                                return res.json()
                            }
                        })
                        .then((res) => console.log(res))
                    }}
                >
                    <FontAwesome name={'chevron-right'} size={30} color='white' />
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default Confirm
