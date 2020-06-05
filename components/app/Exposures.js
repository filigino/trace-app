import React from 'react'
import {connect} from 'react-redux'
import {FlatList, Text, View} from 'react-native'

const mapStateToProps = (state) => ({
    exposures: state.exposures.exposures
})

const Exposures = (props) => {
    const renderExposure = ({item}) => {
        const date = new Date(item.timestamp)
        return (
            <View style={{alignItems: 'center'}}>
                <Text>{date.toLocaleString('default', {month: 'long'})} {date.getDate()}, {date.getFullYear()}</Text>
            </View>
        )
    }

    const {styles} = props.route.params
    return (
        <View style={styles.container}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <FlatList
                    data={props.exposures}
                    renderItem={renderExposure}
                    keyExtractor={(item) => item.ID}
                />
            </View>
        </View>
    )
}

export default connect(mapStateToProps)(Exposures)
