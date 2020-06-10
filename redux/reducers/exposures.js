const exposures = (state = {exposures: [], lastCheckTime: null}, action) => {
    switch (action.type) {
        case 'ADD_EXPOSURE':
            return {...state, exposures: [...state.exposures, {id: action.id, timestamp: action.timestamp}]}
        case 'CLEAR_EXPOSURES': // debug
            return {...state, exposures: []}
        case 'UPDATE_LAST_CHECK_TIME':
            return {...state, lastCheckTime: action.time}
        default:
            return state
    }
}

export default exposures
