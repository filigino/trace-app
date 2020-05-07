import React from 'react'
import {Text, View} from 'react-native'

const Home = (props) => {
    const {styles} = props.route.params
    return (
        <View style={{justifyContent: 'space-around', flexDirection: 'column'}}>
            <Text>Hello?</Text>
        </View>
    )
}

export default Home
