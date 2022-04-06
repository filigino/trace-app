import React from 'react'
import {connect} from 'react-redux'
import {styles} from '../styles'
import Splash from './Splash'
import Trace from './app/Trace'

const mapStateToProps = (state) => ({
    launch: state.launch
})

const Main = (props) => {
    if (props.launch.isLoading) {
        return <Splash styles={styles} />
    } else {
        return <Trace styles={styles} />
    }
}

export default connect(mapStateToProps)(Main)
