import React from 'react'
import {StyleSheet, ScrollView, Text, View} from 'react-native'

const Congrats = (props) => {
    const {username} = props.route.params
    const {email} = props.route.params
    const {firstName} = props.route.params
    const {lastName} = props.route.params
    // const birthDate = new Date(props.route.params.birthDate)
    const {birthDate} = props.route.params
    const {sex} = props.route.params
    const {ethnicity} = props.route.params
    const {styles} = props.route.params

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={localStyles.confirmTextbox}>
                    <Text style={localStyles.heading}>Username</Text>
                    <Text>    {username}</Text>
                </View>
                <View style={localStyles.confirmTextbox}>
                    <Text style={localStyles.heading}>Email</Text>
                    <Text>    {email}</Text>
                </View>
                <View style={localStyles.confirmTextbox}>
                    <Text style={localStyles.heading}>First name</Text>
                    <Text>    {firstName}</Text>
                </View>
                <View style={localStyles.confirmTextbox}>
                    <Text style={localStyles.heading}>Last name</Text>
                    <Text>    {lastName}</Text>
                </View>
                <View style={localStyles.confirmTextbox}>
                    <Text style={localStyles.heading}>Birth date</Text>
                    <Text>    {birthDate}</Text>
                </View>
                <View style={localStyles.confirmTextbox}>
                    <Text style={localStyles.heading}>Sex</Text>
                    <Text>    {sex}</Text>
                </View>
                <View style={localStyles.confirmTextbox}>
                    <Text style={localStyles.heading}>Ethnicity</Text>
                    <Text>    {ethnicity}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const localStyles = StyleSheet.create({
    confirmTextbox: {
        margin: 5
    },
    heading: {
        // color: 'gray'
    }
})

export default Congrats
