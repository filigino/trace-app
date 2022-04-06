const buffer = 1209600000 // 14 days in milliseconds

const exposures = (state = {
    exposures: [], timeLastChecked: null, numberUnopened: 0
}, action) => {
    switch (action.type) {
        case 'ADD_EXPOSURE':
            return {...state,
                exposures: [...state.exposures, {id: action.id, timestamp: action.timestamp}],
                numberUnopened: state.numberUnopened + 1
            }
        case 'CLEAR_OLD_EXPOSURES':
            const now = Date.now()
            return {...state,
                exposures: state.exposures.filter((exposure) => (now - exposure.timestamp < buffer))
            }
        case 'CLEAR_ALL_EXPOSURES':
            return {...state, exposures: [], numberUnopened: 0}
        case 'UPDATE_TIME_LAST_CHECKED':
            return {...state, timeLastChecked: action.time}
        case 'RESET_NUMBER_UNOPENED':
            return {...state, numberUnopened: 0}
        default:
            return state
    }
}

export default exposures
