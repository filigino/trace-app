const exposures = (state = {exposures: []}, action) => {
    switch (action.type) {
        case 'ADD_EXPOSURE':
            return {exposures: [...state.exposures, {ID: action.ID, timestamp: action.timestamp}]}
        case 'CLEAR_EXPOSURES':
            return {exposures: []}
        default:
            return state
    }
}

export default exposures
