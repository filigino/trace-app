import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

const Menu = (props) => {
    const {navigation} = props
    const {styles} = props.route.params
    return (
        <View style={{flex: 2, alignItems: 'stretch'}}>
            <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffd4a3'}}
                onPress={() => navigation.navigate('Drinks')}
            >
                <Text style={{fontSize: 30}}>Drinks</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f39158'}}
                onPress={() => navigation.navigate('Food')}
            >
                <Text style={{fontSize: 30}}>Food</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu
