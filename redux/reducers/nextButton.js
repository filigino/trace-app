const nextButton = (state = {visible: false, color: 'gray', opacity: 1, active: false}, action) => {
    switch (action.type) {
        case 'TOGGLE_BUTTON_VISIBILITY':
            return {...state, visible: action.visible}
        case 'STYLE_BUTTON':
            return {...state, color: action.color, opacity: action.opacity, active: action.active}
        default:
            return state
      }
}

export default nextButton
