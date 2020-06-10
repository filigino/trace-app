const exposures = (state = {exposures: [], lastCheckTime: null, badgeNum: 0}, action) => {
    switch (action.type) {
        case 'ADD_EXPOSURE':
            return {...state, exposures: [...state.exposures, {id: action.id, timestamp: action.timestamp}], badgeNum: state.badgeNum + 1}
        case 'CLEAR_EXPOSURES': // debug
            return {...state, exposures: []}
        case 'UPDATE_LAST_CHECK_TIME':
            return {...state, lastCheckTime: action.time}
        case 'RESET_BADGE':
            return {...state, badgeNum: 0}
        default:
            return state
    }
}

export default exposures
