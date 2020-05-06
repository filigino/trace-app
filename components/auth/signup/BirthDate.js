import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export default class BirthDate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
            skip: false
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({birthDate: this.state.birthDate.toISOString()})
    }

    toggleSkip() {
        this.setState({skip: !this.state.skip}, () => {
            if (this.state.skip) {
                this.props.navigation.setParams({birthDate: null})
            } else {
                this.props.navigation.setParams({birthDate: this.state.birthDate.toISOString()})
            }
        })
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>When were you born?</Text>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <DateTimePicker
                        onChange={(event, date) => this.setState({birthDate: date}, () => {
                            if (!this.state.skip) {
                                this.props.navigation.setParams({birthDate: this.state.birthDate.toISOString()})
                            }
                        })}
                        value={this.state.birthDate}
                        maximumDate={Date.now()}
                        minimumDate={new Date().setFullYear(new Date().getFullYear() - 150)}
                        style={this.state.skip ? {opacity: 0.2} : {}}
                    />
                    <View style={[styles.buttonContainer, {top: 30}]}>
                        <TouchableOpacity
                            onPress={() => this.toggleSkip()}
                            style={[
                                styles.squaredButton,
                                this.state.skip ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
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
