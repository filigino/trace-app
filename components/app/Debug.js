import React from 'react'
import {connect} from 'react-redux'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {clearExposures, clearOldIds, clearAllIds, logExposure, setSelfReportStatus} from '../../redux/ActionCreators'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

const mapStateToProps = (state) => ({
    state,
    ids: state.ids
})

const mapDispatchToProps = (dispatch) => ({
    clearExposures: () => dispatch(clearExposures()),
    clearOldIds: () => dispatch(clearOldIds()),
    clearAllIds: () => dispatch(clearAllIds()),
    logExposure: () => dispatch(logExposure(Date.now(), Date.now())),
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
                    props.clearExposures()
                }}
                style={styles.squaredButton}
            >
                <Text style={{color: 'white'}}>Clear exposures</Text>
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
