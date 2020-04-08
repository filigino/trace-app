const food = (state = {
    food: [], errMess: null
}, action) => {
    switch (action.type) {
        case 'ADD_FOOD':
            return {...state, food: action.food, errMess: null}
        case 'FOOD_FAILED':
            return {...state, errMess: action.errMess}
        default:
            return state
      }
}

export default food
