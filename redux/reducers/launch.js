const launch = (state = {isLoading: true, initialRouteName: 'Home'}, action) => {
    switch (action.type) {
        case 'HIDE_SPLASH':
            return {...state, isLoading: false}
        case 'LAUNCH_EXPOSURES':
            return {...state, initialRouteName: 'Exposures'}
        default:
            return state
    }
}

export default launch
