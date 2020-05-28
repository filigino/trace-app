import React from 'react'
import {connect} from 'react-redux'
import {Linking} from 'expo'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'

const mapStateToProps = (state) => ({
    uuids: state.uuids
})

const Menu = (props) => {
    const {myIDs} = props.uuids
    const {otherIDs} = props.uuids

    // Note curly braces around 'item' to indicate it's a JS object
    const renderID = ({item}) => {
        return (
            <View style={{alignItems: 'center'}}>
                <Text
                    style={{marginTop: 10, marginBottom: 10, fontSize: 20,
                    fontWeight: 'bold'}}
                >
                    {item.id}
                </Text>
                <Text>{item.timestamp}</Text>
            </View>
        )
    }

    return (
        <View style={{backgroundColor: 'white'}}>
            <Text>My IDs</Text>
            <FlatList
                data={myIDs}
                renderItem={renderID}
                keyExtractor={(item) => item.id}
            />
            <Text>Other IDs</Text>
            <FlatList
                data={otherIDs}
                renderItem={renderID}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default connect(mapStateToProps)(Menu)
