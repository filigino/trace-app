const drinks = (state = {
    drinks: [], errMess: null
}, action) => {
    switch (action.type) {
        case 'ADD_DRINKS':
            return {...state, drinks: action.drinks, errMess: null}
        case 'DRINKS_FAILED':
            return {...state, errMess: action.errMess}
        default:
            return state
      }
}

export default drinks
