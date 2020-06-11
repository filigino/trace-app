import React from 'react'
import {connect} from 'react-redux'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import {FlatList, Text, View} from 'react-native'
import {clearBadges} from '../../redux/ActionCreators'

const mapStateToProps = (state) => ({
    exposures: state.exposures
})

const mapDispatchToProps = (dispatch) => ({
    clearBadges: () => dispatch(clearBadges())
})

class Exposures extends React.Component {
    componentDidMount() {
        this.tabListener = this.props.navigation.addListener('focus', () => {
            this.props.clearBadges()
        })
    }

    componentWillUnmount() {
        this.tabListener()
    }

    renderExposure({item}) {
        const date = new Date(item.timestamp)
        return (
            <View style={{alignItems: 'center'}}>
                <Text>{this.formatDate(date)}</Text>
            </View>
        )
    }

    formatLastCheckTime(lastCheckTime) {
        const today = new Date()

        const date = (lastCheckTime.toDateString() !== today.toDateString()) ? 'Today' : this.formatDate(lastCheckTime)
        const time = this.formatTime(lastCheckTime)

        return date + ' at ' + time
    }

    formatDate(dateObj) {
        const month = dateObj.toLocaleString('default', {month: 'long'})
        const date = dateObj.getDate()
        const year = dateObj.getFullYear()

        return month + ' ' + date + ', ' + year
    }

    formatTime(dateObj) {
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

    render() {
        const {exposures} = this.props.exposures
        const lastCheckTime = this.formatLastCheckTime(new Date(this.props.exposures.lastCheckTime))
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text>Exposures last checked:</Text>
                    <Text>{lastCheckTime}</Text>
                    <FlatList
                        data={exposures}
                        renderItem={(item) => this.renderExposure(item)}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exposures)
