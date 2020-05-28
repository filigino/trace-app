import React from 'react'
import {Text, View} from 'react-native'

const Congrats = (props) => {
    const {styles} = props.route.params

    return (
        <View style={styles.containerAuth}>
            <Text style={styles.heading}>Thanks for signing up!</Text>
        </View>
    )
}

export default Congrats
