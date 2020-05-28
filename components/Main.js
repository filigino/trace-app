import React from 'react'
import {connect} from 'react-redux'
import {styles} from '../styles'
import Splash from './Splash'
import Auth from './auth/Auth'
import Trace from './app/Trace'

const mapStateToProps = (state) => ({
    auth: state.auth
})

const Main = (props) => {
    // if (props.auth.isLoading) {
    //     return <Splash styles={styles} />
    // } else {
    //     if (props.auth.token === null) {
    //         return <Auth styles={styles} />
    //     } else {
            return <Trace styles={styles} />
    //     }
    // }
}

export default connect(mapStateToProps)(Main)
