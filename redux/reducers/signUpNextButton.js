const signUpNextButton = (state = {active: false, color: 'gray', activeOpacity: 1, visible: false}, action) => {
    switch (action.type) {
        case 'STYLE_BUTTON':
            return {...state, active: action.active, color: action.color, activeOpacity: action.activeOpacity}
        case 'TOGGLE_BUTTON_VISIBILITY':
            return {...state, visible: action.visible}
        default:
            return state
    }
}

export default signUpNextButton
