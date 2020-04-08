const locations = (state = {
    locations: [], errMess: null
}, action) => {
    switch (action.type) {
        case 'ADD_LOCATIONS':
            return {...state, locations: action.locations, errMess: null}
        case 'LOCATIONS_FAILED':
            return {...state, errMess: action.errMess}
        default:
            return state
      }
}

export default locations
