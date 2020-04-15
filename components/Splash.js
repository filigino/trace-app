import React from 'react'
import {Image, View, Text} from 'react-native'

class Splash extends React.Component {
    componentDidMount() {
        setTimeout(this.props.hideSplash, 2000)
    }

    render() {
        return (
            <View style={[this.props.styles.screen, {backgroundColor: '#6b52ae'}]}>
                <Image
                    source={require('../assets/logo.png')}
                    style={{height: 200, resizeMode: 'contain'}}
                />
            </View>
        )
    }
}

export default Splash
