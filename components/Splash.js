
import React from 'react'
import {connect} from 'react-redux'
import BackgroundFetch from 'react-native-background-fetch'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import {Image, StatusBar, View} from 'react-native'
import {url} from '../url'
import {
    addExposure, clearOldIds, deleteOtherId, hideSplash, launchExposures,
    updateLastCheckTime
} from '../redux/ActionCreators'

const mapStateToProps = (state) => ({
    otherIds: state.ids.otherIds
})

const mapDispatchToProps = (dispatch) => ({
    addExposure: (id, timestamp) => dispatch(addExposure(id, timestamp)),
    clearOldIds: () => dispatch(clearOldIds()),
    deleteOtherId: (id) => dispatch(deleteOtherId(id)),
    hideSplash: () => dispatch(hideSplash()),
    launchExposures: () => dispatch(launchExposures()),
    updateLastCheckTime: (time) => dispatch(updateLastCheckTime(time))
})

class Splash extends React.Component {
    componentDidMount() {
        this.props.clearOldIds()

        fetch(url + 'infections', {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((infections) => {
            for (const infection of infections) {
                for (const otherId of this.props.otherIds) {
                    if (otherId.id === infection.id) {
                        this.props.addExposure(otherId.id, otherId.timestamp)
                        this.props.deleteOtherId(otherId.id)
                        this.incrementBadgeNumber()
                        break
                    }
                }
            }
            this.props.updateLastCheckTime(Date.now())
        })
        .then(() => PushNotificationIOS.getInitialNotification())
        .then((promise) => {
            if (promise !== null) {
                this.props.launchExposures()
            }
        })
        .then(() => {
            setTimeout(() => this.props.hideSplash(), 1000) // milliseconds
        })
        .catch((err) => console.log(err))
    }

    configureBackgroundFetch() {
        BackgroundFetch.configure({
            minimumFetchInterval: 60 // minutes
        }, async (taskId) => {
            fetch(url + 'infections', {
                method: 'GET'
            })
            .then((res) => res.json())
            .then((infections) => {
                for (const infection of infections) {
                    for (const otherId of this.props.otherIds) {
                        if (otherId.id === infection.id) {
                            this.props.addExposure(otherId.id, otherId.timestamp)
                            this.props.deleteOtherId(otherId.id)
                            this.incrementBadgeNumber()
                            this.pushExposureNotif()
                            break
                        }
                    }
                }
                this.props.updateLastCheckTime(Date.now())
            })
            .catch((err) => console.log(err))
            BackgroundFetch.finish(taskId)
        }, (err) => {
            console.log('[js] RNBackgroundFetch failed to start')
        })
    }

    incrementBadgeNumber() {
        PushNotificationIOS.getApplicationIconBadgeNumber((badgeNum) => {
            PushNotificationIOS.setApplicationIconBadgeNumber(badgeNum + 1)
        })
    }

    pushExposureNotif() {
        PushNotificationIOS.presentLocalNotification({
            alertTitle: 'Potential COVID-19 Exposure',
            alertBody: 'Someone you were near recently has tested positive for COVID-19. Tap for more info.'
        })
    }

    render() {
        const {styles} = this.props
        return (
            <View style={styles.splash}>
                <StatusBar barStyle='dark-content'/>
                <Image style={styles.splashImage} source={require('../assets/img/people-connection.png')} />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
