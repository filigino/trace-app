import React from 'react'
import {StatusBar, Text, View} from 'react-native'

export default class Home extends React.Component {
    render() {
        const {styles} = this.props.route.params
        return (
            <View style={{justifyContent: 'space-around', flexDirection: 'column'}}>
                <StatusBar barStyle='light-content'/>
                <Text>Hello?</Text>
            </View>
        )
    }
}
