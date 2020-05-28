export const logMyID = (id) => ({
    type: 'LOG_MY_ID',
    id
})

export const logOtherID = (id) => ({
    type: 'LOG_OTHER_ID',
    id
})

export const clearOldIDs = () => ({
    type: 'CLEAR_OLD_IDS'
})

// debug
export const clearAllIDs = () => ({
    type: 'CLEAR_ALL_IDS'
})
