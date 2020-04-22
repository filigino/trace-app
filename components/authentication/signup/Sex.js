import React from 'react'
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

export default class Sex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            female: false,
            male: false
        }        
    }

    toggleFemale() {
        if (this.state.male) {
            this.setState({male: false})
        }
        this.setState({female: !this.state.female}, () => {
            if (this.state.female) {
                this.props.navigation.setParams({sex: 'F'})
            } else {
                this.props.navigation.setParams({sex: ''})
            }
        })
    }

    toggleMale() {
        if (this.state.female) {
            this.setState({female: false})
        }
        this.setState({male: !this.state.male}, () => {
            if (this.state.male) {
                this.props.navigation.setParams({sex: 'M'})
            } else {
                this.props.navigation.setParams({sex: ''})
            }
        })
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <Text>{this.props.route.params.birthDate}</Text>
                <Text>Sex</Text>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => this.toggleFemale()}
                        style={[styles.xorButton, this.state.female ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>F</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toggleMale()}
                        style={[styles.xorButton, this.state.male ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>M</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.nextButtonPosition}>
                    <TouchableHighlight
                        style={styles.roundButton}
                        underlayColor={'purple'}
                        onPress={() => this.props.navigation.push('Ethnicity', this.props.route.params)}
                    >
                        <FontAwesome name={'chevron-right'} size={30} color='white' />
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}
