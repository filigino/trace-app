import * as React from 'react'
import {TabActions} from '@react-navigation/native'

export const navigationRef = React.createRef()

export function jumpTo(...args) {
    navigationRef.current?.dispatch(TabActions.jumpTo(...args))
}
