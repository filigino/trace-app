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

    formatTimeLastChecked(timeLastChecked) {
        const today = new Date()

        const formattedDate = (timeLastChecked.toDateString() === today.toDateString()) ? 'Today' : this.formatDate(timeLastChecked)
        const formattedTime = this.formatTime(timeLastChecked)

        return formattedDate + ' at ' + formattedTime
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

    renderExposure({item}) {
        const date = new Date(item.timestamp)
        return (
            <View style={{
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                paddingHorizontal: 20,
                paddingVertical: 5
            }}>
                <Text style={{fontWeight: 'bold'}}>Possible Exposure</Text>
                <Text style={{color: 'gray'}}>{this.formatDate(date)}</Text>
            </View>
        )
    }

    render() {
        const {exposures} = this.props.exposures
        const timeLastChecked = this.formatTimeLastChecked(new Date(this.props.exposures.timeLastChecked))
        const {styles} = this.props.route.params
        return (
            <View style={{flex: 1, paddingTop: 40}}>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                    <Text style={{color: 'gray'}}>Exposure last checked:</Text>
                    <Text style={{color: 'gray'}}>{timeLastChecked}</Text>
                </View>
                <View style={{paddingBottom: 5}}>
                    <Text style={{
                        color: 'gray',
                        fontSize: 13,
                        fontWeight: 'bold',
                        paddingHorizontal: 20
                    }}>
                        EXPOSURES IN PAST 14 DAYS
                    </Text>
                </View>
                <View style={{flex: 5}}>
                    {exposures.length > 0 ? (
                        <View style={{backgroundColor: 'white', borderColor: 'lightgray', borderTopWidth: 1}}>
                            <FlatList
                                data={exposures}
                                renderItem={(item) => this.renderExposure(item)}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                    ) : (
                        <View style={{
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center'
                        }}>
                            <Text>No exposures</Text>
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Exposures)
