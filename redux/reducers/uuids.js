const buffer = 1209600000 // 14 days

const uuids = (state = {myIDs: [], otherIDs: []}, action) => {
    switch (action.type) {
        case 'LOG_MY_ID':
            return {...state, myIDs: [...state.myIDs, {id: action.id, timestamp: Date.now()}]}
        case 'LOG_OTHER_ID':
            return {...state, otherIDs: [...state.otherIDs, {id: action.id, timestamp: Date.now()}]}
        case 'CLEAR_OLD_IDS':
            const now = Date.now()
            return {
                myIDs: state.myIDs.filter(id => (now - id.timestamp < buffer)),
                otherIDs: state.otherIDs.filter(id => (now - id.timestamp < buffer))
            }
        case 'CLEAR_ALL_IDS': // debug
            return {myIDs: [], otherIDs: []}
        default:
            return state
    }
}

export default uuids
