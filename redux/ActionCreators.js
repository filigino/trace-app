import PushNotificationIOS from '@react-native-community/push-notification-ios'

export const logExposure = (id, timestamp) => (dispatch) => {
    dispatch(addExposure(id, timestamp))
    PushNotificationIOS.presentLocalNotification({
        alertTitle: 'Potential COVID-19 Exposure',
        alertBody: 'Someone you were near recently has tested positive for COVID-19. Tap for more info.'
    })
    PushNotificationIOS.getApplicationIconBadgeNumber((badgeNum) => {
        PushNotificationIOS.setApplicationIconBadgeNumber(badgeNum + 1)
    })
}

export const clearBadges = () => (dispatch) => {
    dispatch(resetNumberUnopened())
    PushNotificationIOS.setApplicationIconBadgeNumber(0)
}

export const addExposure = (id, timestamp) => ({
    type: 'ADD_EXPOSURE',
    id,
    timestamp
})

export const clearOldExposures = () => ({
    type: 'CLEAR_OLD_EXPOSURES'
})

export const clearAllExposures = () => ({
    type: 'CLEAR_ALL_EXPOSURES'
})

export const updateTimeLastChecked = (time) => ({
    type: 'UPDATE_TIME_LAST_CHECKED',
    time
})

export const resetNumberUnopened = () => ({
    type: 'RESET_NUMBER_UNOPENED'
})

export const addMyId = (id) => ({
    type: 'ADD_MY_ID',
    id
})

export const addOtherId = (id) => ({
    type: 'ADD_OTHER_ID',
    id
})

export const deleteOtherId = (id) => ({
    type: 'DELETE_OTHER_ID',
    id
})

export const clearOldMyIds = () => ({
    type: 'CLEAR_OLD_MY_IDS'
})

export const clearAllOldIds = () => ({
    type: 'CLEAR_ALL_OLD_IDS'
})

export const clearAllIds = () => ({
    type: 'CLEAR_ALL_IDS'
})

export const hideSplash = () => ({
    type: 'HIDE_SPLASH'
})

export const launchExposures = () => ({
    type: 'LAUNCH_EXPOSURES'
})

export const setTracingStatus = (status) => ({
    type: 'SET_TRACING_STATUS',
    status
})

export const setSelfReportStatus = (status) => ({
    type: 'SET_SELF-REPORT_STATUS',
    status
})
