// Cities are currently hardcoded...change in future?
import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {Linking} from 'expo'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
        locations: state.locations.locations
})

// Change out of class method to function if not needed
class Locations extends React.Component {
    render() {
        // All components specified in navigator are passed route and navigation props
        // Same as:
        // var item = this.props.route.params.item
        const {locations} = this.props

        // Note curly braces around 'item' to indicate it's a JS object
        const renderCity = ({item}) => {
            const renderLocation = ({item}) => {
                return (
                    <View style={{marginBottom: 40, alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                        <Text>{item.number} {item.street}{item.unit ? (' Unit ' + item.unit) : ''}</Text>
                        <Text>{item.city}, {item.province}</Text>
                        <Text>{item.postal_code}</Text>
                        <TouchableOpacity
                            style={{padding: 5, margin: 5, backgroundColor: '#6b52ae'}}
                            onPress={() => Linking.openURL(item.url)}
                        >
                            <Text style={{color: 'white'}}>MAP</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

            return (
                <View style={{alignItems: 'center'}}>
                    <Text
                        style={{marginTop: 10, marginBottom: 10, fontSize: 20,
                        fontWeight: 'bold'}}
                    >
                        {item}
                    </Text>
                    <FlatList
                        data={locations.filter((location) => location.city === item)}
                        renderItem={renderLocation}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )
        }

        let cities = []
        for (let i = 0; i < locations.length; i++) {
            const city = locations[i].city
            if (!cities.includes(city)) cities.push(city)
        }

        return (
            <View style={{backgroundColor: 'white'}}>
                <FlatList
                    data={cities}
                    renderItem={renderCity}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps)(Locations)
