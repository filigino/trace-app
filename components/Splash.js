import React from 'react'
import {Image, View} from 'react-native'

class Splash extends React.Component {
    componentDidMount() {
        setTimeout(this.props.hideSplash, 2000)
    }

    render() {
        return (
            <View style={[this.props.styles.screen, {backgroundColor: '#ea5404'}]}>
                <Image
                    source={require('../assets/logo.png')}
                    style={this.props.styles.image}
                />
            </View>
        )
    }
}

export default Splash
