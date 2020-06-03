import React from 'react'
import {connect} from 'react-redux'
import {Text, TouchableOpacity, View} from 'react-native'
import {clearAllIDs} from '../../redux/ActionCreators'

const mapDispatchToProps = (dispatch) => ({
    clearAllIDs: () => dispatch(clearAllIDs())
})

class Exposures extends React.Component {
    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.clearAllIDs()
                        }}
                        style={styles.squaredButton}
                    >
                        <Text style={{color: 'white'}}>Clear All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Exposures)
