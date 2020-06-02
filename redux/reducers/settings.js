const settings = (state = {tracingIsEnabled: false, selfReported: false}, action) => {
    switch (action.type) {
        case 'SET_TRACING_STATUS':
            return {...state, tracingIsEnabled: action.status}
        case 'SET_SELF-REPORT_STATUS':
            return {...state, selfReported: action.status}
        default:
            return state
    }
}

export default settings
