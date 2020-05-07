import React from 'react'
import {FlatList, Image, Text, View} from 'react-native'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
        food: state.food.food
})

const Food = (props) => {
    const {food} = props
    const {styles} = props.route.params

    const renderFood = ({item}) => {
        return (
            <View style={{flex: 4, flexDirection: 'row', backgroundColor: 'white'}}>
                <View style={{flex: 1}}>
                    <Image
                        source={{uri: item.image}} style={{width: 100, height: 100}}
                    />
                </View>
                <View style={{flex: 3, alignItems: 'center'}}>
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                    <Text>Cals: {item.calories}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <FlatList
                data={food}
                renderItem={renderFood}
                // Key must be string
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default connect(mapStateToProps)(Food)
