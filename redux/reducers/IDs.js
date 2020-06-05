const buffer = 1209600000 // 14 days in milliseconds

const IDs = (state = {myIDs: [], otherIDs: []}, action) => {
    switch (action.type) {
        case 'ADD_MY_ID':
            return {...state, myIDs: [...state.myIDs, {ID: action.ID, timestamp: Date.now()}]}
        case 'ADD_OTHER_ID':
            return {...state, otherIDs: [...state.otherIDs, {ID: action.ID, timestamp: Date.now()}]}
        case 'CLEAR_OLD_IDS':
            const now = Date.now()
            return {
                myIDs: state.myIDs.filter(ID => (now - ID.timestamp < buffer)),
                otherIDs: state.otherIDs.filter(ID => (now - ID.timestamp < buffer))
            }
        case 'CLEAR_ALL_IDS': // debug
            return {myIDs: [], otherIDs: []}
        default:
            return state
    }
}

export default IDs
