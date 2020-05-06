const auth = (state = {token: null, isLoading: true}, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {...state, token: action.token}
        case 'LOAD':
            return {...state, isLoading: false}
        case 'DESTROY_TOKEN':
            return {...state, token: null}
        default:
            return state
      }
}

export default auth
