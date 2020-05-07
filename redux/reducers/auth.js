const auth = (state = {token: null, isLoading: true}, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {...state, token: action.token}
        case 'DESTROY_TOKEN':
            return {...state, token: null}
        case 'HIDE_SPLASH':
            return {...state, isLoading: false}
        default:
            return state
    }
}

export default auth
