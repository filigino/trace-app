import PushNotificationIOS from '@react-native-community/push-notification-ios'

export const logExposure = (id, timestamp) => (dispatch) => {
    PushNotificationIOS.getApplicationIconBadgeNumber((badgeNum) => {
        PushNotificationIOS.setApplicationIconBadgeNumber(badgeNum + 1)
    })
    dispatch(addExposure(id, timestamp))
}

export const clearBadges = () => (dispatch) => {
    PushNotificationIOS.setApplicationIconBadgeNumber(0)
    dispatch(resetBadge())
}

export const addExposure = (id, timestamp) => ({
    type: 'ADD_EXPOSURE',
    id,
    timestamp
})

export const clearExposures = () => ({
    type: 'CLEAR_EXPOSURES'
})

export const updateLastCheckTime = (time) => ({
    type: 'UPDATE_LAST_CHECK_TIME',
    time
})

export const resetBadge = () => ({
    type: 'RESET_BADGE'
})

export const hideSplash = () => ({
    type: 'HIDE_SPLASH'
})

export const launchExposures = () => ({
    type: 'LAUNCH_EXPOSURES'
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

export const clearOldIds = () => ({
    type: 'CLEAR_OLD_IDS'
})

// debug
export const clearAllIds = () => ({
    type: 'CLEAR_ALL_IDS'
})

export const setTracingStatus = (status) => ({
    type: 'SET_TRACING_STATUS',
    status
})

export const setSelfReportStatus = (status) => ({
    type: 'SET_SELF-REPORT_STATUS',
    status
})
