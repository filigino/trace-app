export const logMyID = (ID) => ({
    type: 'LOG_MY_ID',
    ID
})

export const logOtherID = (ID) => ({
    type: 'LOG_OTHER_ID',
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
