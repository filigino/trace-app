
import React from 'react'
import {connect} from 'react-redux'
import BackgroundFetch from 'react-native-background-fetch'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import {Alert, Image, Linking, StatusBar, View} from 'react-native'
import {url} from '../url'
import {
    clearAllOldIds, clearOldExposures, deleteOtherId, hideSplash,
    launchExposures, logExposure, updateTimeLastChecked
} from '../redux/ActionCreators'

const mapStateToProps = (state) => ({
    otherIds: state.ids.otherIds
})

const mapDispatchToProps = (dispatch) => ({
    clearAllOldIds: () => dispatch(clearAllOldIds()),
    clearOldExposures: () => dispatch(clearOldExposures()),
    deleteOtherId: (id) => dispatch(deleteOtherId(id)),
    hideSplash: () => dispatch(hideSplash()),
    launchExposures: () => dispatch(launchExposures()),
    logExposure: (id, timestamp) => dispatch(logExposure(id, timestamp)),
    updateTimeLastChecked: (time) => dispatch(updateTimeLastChecked(time))
})

class Splash extends React.Component {
    componentDidMount() {
        PushNotificationIOS.requestPermissions()
        .then((permissions) => {
            this.configureBackgroundFetch()
            return permissions
        })
        .then((permissions) => {
            if (!permissions.alert && !permissions.badge && !permissions.sound) {
                Alert.alert(
                    'Notifications are Off',
                    'Please enable Notifications so Trace can alert you of any possible exposures to COVID-19.',
                    [{
                        text: 'Open Settings',
                        onPress: () => Linking.openSettings()
                    }]
                )
            }
        })
        .then(() => {
            this.props.clearAllOldIds()
            this.props.clearOldExposures()
            fetch(url + 'infections', {method: 'GET'})
            .then((res) => res.json())
            .then((infections) => {
                for (const infection of infections) {
                    for (const otherId of this.props.otherIds) {
                        if (otherId.id === infection.id) {
                            this.props.logExposure(otherId.id, otherId.timestamp)
                            this.props.deleteOtherId(otherId.id)
                            break
                        }
                    }
                }
                this.props.updateTimeLastChecked(Date.now())
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
        })
    }

    configureBackgroundFetch() {
        BackgroundFetch.configure({
            minimumFetchInterval: 60 // minutes
        }, async (taskId) => {
            this.props.clearAllOldIds()
            this.props.clearOldExposures()
            fetch(url + 'infections', {method: 'GET'})
            .then((res) => res.json())
            .then((infections) => {
                for (const infection of infections) {
                    for (const otherId of this.props.otherIds) {
                        if (otherId.id === infection.id) {
                            this.props.logExposure(otherId.id, otherId.timestamp)
                            this.props.deleteOtherId(otherId.id)
                            break
                        }
                    }
                }
                this.props.updateTimeLastChecked(Date.now())
            })
            .catch((err) => console.log(err))
            BackgroundFetch.finish(taskId)
        }, (err) => {
            let title
            let message
            PushNotificationIOS.checkPermissions((permissions) => {
                if (!permissions.alert && !permissions.badge && !permissions.sound) {
                    title = 'Notifications and Background App Refresh are Off'
                    message = 'Please enable Notifications and Background App Refresh so Trace can alert you of any possible exposures to COVID-19.\n\nAfter enabling, please close and reopen Trace.'
                } else {
                    title = 'Background App Refresh is Off'
                    message = 'Please enable Background App Refresh so Trace can alert you of any possible exposures to COVID-19.\n\nAfter enabling, please close and reopen Trace.'
                }
                Alert.alert(
                    title,
                    message,
                    [{
                        text: 'Open Settings',
                        onPress: () => Linking.openSettings()
                    }]
                )
            })
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
