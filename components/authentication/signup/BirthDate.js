import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {FontAwesome} from '@expo/vector-icons'

export default class BirthDate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            birthDate: new Date().setFullYear(new Date().getFullYear() - 18)
        }
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <DateTimePicker
                    onChange={(event, date) => this.setState({birthDate: date},
                        () => this.props.navigation.setParams({birthDate: this.state.birthDate.toISOString()}))}
                    value={this.state.birthDate}
                    maximumDate={Date.now()}
                    minimumDate={new Date().setFullYear(new Date().getFullYear() - 150)}
                />
                <View style={styles.nextButtonPosition}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        underlayColor={'purple'}
                        onPress={() => {
                            this.props.navigation.push('Sex', this.props.route.params)
                        }}
                    >
                        <FontAwesome name={'chevron-right'} size={30} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
