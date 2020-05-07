import React from 'react'
import {connect} from 'react-redux'
import {checkToken} from '../redux/ActionCreators'
import {StatusBar, View} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const mapDispatchToProps = (dispatch) => ({
    checkToken: () => dispatch(checkToken())
})

class Splash extends React.Component {
    componentDidMount() {
        this.props.checkToken()
    }

    render() {
        const {styles} = this.props
        return (
            <View style={styles.splash}>
                <StatusBar barStyle='dark-content'/>
                <MaterialCommunityIcons
                    name={'draw'}
                    size={200}
                />
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Splash)
