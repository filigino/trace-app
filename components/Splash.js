import React from 'react'
import {connect} from 'react-redux'
import {checkToken} from '../redux/ActionCreators'
import {StatusBar, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const mapDispatchToProps = (dispatch) => ({
    checkToken: () => dispatch(checkToken())
})

class Splash extends React.Component {
    componentDidMount() {
        this.props.checkToken()
    }

    render() {
        return (
            <View style={this.props.styles.splash}>
                <StatusBar barStyle='dark-content'/>
                <Ionicons
                    name={'md-contacts'}
                    size={200}
                />
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Splash)
