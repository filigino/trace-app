import React from 'react'
import {FlatList, Image, Text, View} from 'react-native'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
        drinks: state.drinks.drinks
})

class Drinks extends React.Component {
    render() {
        const {drinks} = this.props
        const {styles} = this.props.route.params

        const renderDrink = ({item}) => {
            return (
                <View style={{flex: 4, flexDirection: 'row', backgroundColor: 'white'}}>
                    <View style={{flex: 1}}>
                        <Image
                            source={{uri: item.image}} style={{width: 100, height: 100}}
                        />
                    </View>
                    <View style={{flex: 3, alignItems: 'center'}}>
                        <Text>{item.name}</Text>
                        <Text>R: {item.price_regular} L: {item.price_large}</Text>
                        <Text>Cals: {item.calories_lower}-{item.calories_upper}</Text>
                    </View>
                </View>
            )
        }

        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <FlatList
                    data={drinks}
                    renderItem={renderDrink}
                    // Key must be string
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps)(Drinks)
