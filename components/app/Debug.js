import React from 'react'
import {connect} from 'react-redux'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {clearOldExposures, clearAllExposures, clearOldIds, clearAllIds, logExposure, setSelfReportStatus} from '../../redux/ActionCreators'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

const mapStateToProps = (state) => ({
    state,
    ids: state.ids
})

const mapDispatchToProps = (dispatch) => ({
    clearOldExposures: () => dispatch(clearOldExposures()),
    clearAllExposures: () => dispatch(clearAllExposures()),
    clearOldIds: () => dispatch(clearOldIds()),
    clearAllIds: () => dispatch(clearAllIds()),
    logExposure: () => dispatch(logExposure(Date.now().toString(), Date.now())),
    setSelfReportStatus: (status) => dispatch(setSelfReportStatus(status))
})

const Debug = (props) => {
    const {myIds} = props.ids
    const {otherIds} = props.ids
    const {styles} = props.route.params

    // Note curly braces around 'item' to indicate it's a JS object
    const renderId = ({item}) => {
        return (
            <View style={{alignItems: 'center'}}>
                <Text>{item.id}</Text>
                <Text>{new Date(item.timestamp).toString()}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    props.logExposure()
                }}
                style={styles.squaredButton}
            >
                <Text style={{color: 'white'}}>Add exposure</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.clearOldExposures()
                }}
                style={styles.squaredButton}
            >
                <Text style={{color: 'white'}}>Clear old exposures</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.clearAllExposures()
                }}
                style={styles.squaredButton}
            >
                <Text style={{color: 'white'}}>Clear exposures</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    PushNotificationIOS.presentLocalNotification({
                        alertTitle: 'Potential COVID-19 Exposure',
                        alertBody: 'Someone you were near recently has tested positive for COVID-19. Tap for more info.'
                    })
                }}
                style={styles.squaredButton}
            >
                <Text style={{color: 'white'}}>Push notif</Text>
            </TouchableOpacity>
            <Text>My Ids</Text>
            <FlatList
                data={myIds}
                renderItem={renderId}
                keyExtractor={(item) => item.id}
            />
            <Text>Other IDs</Text>
            <FlatList
                data={otherIds}
                renderItem={renderId}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Debug)
