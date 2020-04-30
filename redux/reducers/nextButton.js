const nextButton = (state = {active: false, color: 'gray', opacity: 1, visible: false}, action) => {
    switch (action.type) {
        case 'STYLE_BUTTON':
            return {...state, active: action.active, color: action.color, opacity: action.opacity}
        case 'TOGGLE_BUTTON_VISIBILITY':
            return {...state, visible: action.visible}
        default:
            return state
      }
}

export default nextButton
