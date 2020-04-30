import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {Foundation} from '@expo/vector-icons'
import {connect} from 'react-redux'
import {activateButton, deactivateButton} from '../../../redux/ActionCreators'

const mapDispatchToProps = (dispatch) => ({
    activateButton: () => dispatch(activateButton()),
    deactivateButton: () => dispatch(deactivateButton())
})

class Sex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            started: false
        }
    }

    componentDidMount() {
        this.props.deactivateButton()
    }

    onPress(sex) {
        this.props.navigation.setParams({sex})
        if (!this.state.started) {
            this.props.activateButton()
            this.setState({started: true})
        }
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>What is your sex?</Text>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={[{
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }, this.props.route.params.sex === '' ? {opacity: 0.2} : {}]}>
                        <TouchableOpacity
                            onPress={() => this.onPress('M')}
                            style={[
                                styles.squaredButton,
                                {height: 100, width: 100},
                                this.props.route.params.sex === 'M' ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}]}
                        >
                            <>
                                <Foundation name={'male-symbol'} size={50} color='white' />
                                <Text style={{color: 'white'}}>Male</Text>
                            </>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onPress('F')}
                            style={[
                                styles.squaredButton,
                                {height: 100, width: 100},
                                this.props.route.params.sex === 'F' ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}]}
                        >
                            <>
                                <Foundation name={'female-symbol'} size={50} color='white' />
                                <Text style={{color: 'white'}}>Female</Text>
                            </>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.buttonContainer, {top: 30}]}>
                        <TouchableOpacity
                            onPress={() => this.onPress('')}
                            style={[
                                styles.squaredButton,
                                this.props.route.params.sex === '' ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>I'd rather not say</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Sex)
