import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export default class BirthDate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
        }
        this.props.navigation.setParams({birthDate: this.state.birthDate.toISOString()})
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center'}}>When were you born?</Text>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <DateTimePicker
                        onChange={(event, date) => this.setState({birthDate: date},
                            () => this.props.navigation.setParams({birthDate: this.state.birthDate.toISOString()}))}
                        value={this.state.birthDate}
                        maximumDate={Date.now()}
                        minimumDate={new Date().setFullYear(new Date().getFullYear() - 150)}
                    />
                </View>
            </View>
        )
    }
}
