import React from 'react'
import {connect} from 'react-redux'
import {styles} from '../styles'
import Trace from './app/Trace'

const Main = (props) => {
    return <Trace styles={styles} />
}

export default Main
