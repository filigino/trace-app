export const addExposure = (ID, timestamp) => ({
    type: 'ADD_EXPOSURE',
    ID,
    timestamp
})

export const clearExposures = () => ({
    type: 'CLEAR_EXPOSURES'
})

export const updateLastCheckTime = (time) => ({
    type: 'UPDATE_LAST_CHECK_TIME',
    time
})

export const addMyID = (ID) => ({
    type: 'ADD_MY_ID',
    ID
})

export const addOtherID = (ID) => ({
    type: 'ADD_OTHER_ID',
    ID
})

export const deleteOtherID = (ID) => ({
    type: 'DELETE_OTHER_ID',
    ID
})

export const clearOldIDs = () => ({
    type: 'CLEAR_OLD_IDS'
})

// debug
export const clearAllIDs = () => ({
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
