import React from 'react'
import {connect} from 'react-redux'
import {FlatList, Text, View} from 'react-native'

const mapStateToProps = (state) => ({
    exposures: state.exposures
})

const Exposures = (props) => {
    const renderExposure = ({item}) => {
        const date = new Date(item.timestamp)
        return (
            <View style={{alignItems: 'center'}}>
                <Text>{formatDate(date)}</Text>
            </View>
        )
    }

    const formatLastCheckTime = (lastCheckTime) => {
        const today = new Date()

        const date = (lastCheckTime.toDateString() !== today.toDateString()) ? 'Today' : formatDate(lastCheckTime)
        const time = formatTime(lastCheckTime)

        return date + ' at ' + time
    }

    const formatDate = (dateObj) => {
        const month = dateObj.toLocaleString('default', {month: 'long'})
        const date = dateObj.getDate()
        const year = dateObj.getFullYear()

        return month + ' ' + date + ', ' + year
    }

    const formatTime = (dateObj) => {
        let pm = false
        let hrs = dateObj.getHours()
        if (hrs > 11) {
            hrs = hrs % 12
            pm = true
        }
        if (hrs === 0) hrs = 12

        let mins = dateObj.getMinutes()
        if (mins < 10) mins = '0' + mins

        return hrs + ':' + mins + (pm ? ' PM' : ' AM')
    }

    const {exposures} = props.exposures
    const lastCheckTime = formatLastCheckTime(new Date(props.exposures.lastCheckTime))
    const {styles} = props.route.params
    return (
        <View style={styles.container}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text>Exposures last checked:</Text>
                <Text>{lastCheckTime}</Text>
                <FlatList
                    data={exposures}
                    renderItem={renderExposure}
                    keyExtractor={(item) => item.ID}
                />
            </View>
        </View>
    )
}

export default connect(mapStateToProps)(Exposures)
