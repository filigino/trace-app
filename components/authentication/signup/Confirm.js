import React from 'react'
import {ScrollView, Text, View} from 'react-native'

const Confirm = (props) => {
    const {username} = props.route.params
    const {email} = props.route.params
    const {firstName} = props.route.params
    const {lastName} = props.route.params
    const {birthDate} = props.route.params
    const {sex} = props.route.params
    const {ethnicity} = props.route.params
    const {styles} = props.route.params

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>Username</Text>
                <Text>{username}</Text>
                <Text>Email</Text>
                <Text>{email}</Text>
                <Text>First name</Text>
                <Text>{firstName}</Text>
                <Text>Last name</Text>
                <Text>{lastName}</Text>
                <Text>Birth date</Text>
                <Text>{birthDate}</Text>
                <Text>Sex</Text>
                <Text>{sex}</Text>
                <Text>Ethnicity</Text>
                <Text>{ethnicity}</Text>
            </ScrollView>
        </View>
    )
}

export default Confirm
