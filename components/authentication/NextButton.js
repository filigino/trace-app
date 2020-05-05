import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import {connect} from 'react-redux'

const mapStateToProps = (state) => ({
    nextButton: state.nextButton
})

const Main = (props) => {
    return (
        <View style={[
            props.styles.nextButtonPosition,
            {opacity: props.nextButton.visible ? 1 : 0}
        ]}>
            <TouchableOpacity
                onPress={() => props.onPress()}
                activeOpacity={props.nextButton.opacity}
                style={[props.styles.roundButton, {backgroundColor: props.nextButton.color}]}
            >
                <FontAwesome5 name={'chevron-right'} size={30} color='white' />
            </TouchableOpacity>
        </View>
    )
}

export default connect(mapStateToProps)(Main)
