import React from 'react'
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

export default class Ethnicity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            americanIndian: false,
            black: false,
            eastAsian: false,
            hispanicLatino: false,
            middleEastern: false,
            pacificIslander: false,
            southAsian: false,
            white: false,
            other: false
        }        
    }

    toggleAmericanIndian() {
        this.setState({americanIndian: !this.state.americanIndian})
    }

    toggleBlack() {
        this.setState({black: !this.state.black})
    }

    toggleEastAsian() {
        this.setState({eastAsian: !this.state.eastAsian})
    }

    toggleHispanicLatino() {
        this.setState({hispanicLatino: !this.state.hispanicLatino})
    }

    toggleMiddleEastern() {
        this.setState({middleEastern: !this.state.middleEastern})
    }

    togglePacificIslander() {
        this.setState({pacificIslander: !this.state.pacificIslander})
    }

    toggleSouthAsian() {
        this.setState({southAsian: !this.state.southAsian})
    }

    toggleWhite() {
        this.setState({white: !this.state.white})
    }

    toggleOther() {
        this.setState({other: !this.state.other})
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <Text>Ethnicity</Text>
                <View>
                    <TouchableOpacity
                        onPress={() => this.toggleAmericanIndian()}
                        style={[styles.checkButton, this.state.americanIndian ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>American Indian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toggleBlack()}
                        style={[styles.checkButton, this.state.black ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Black/African Descent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toggleEastAsian()}
                        style={[styles.checkButton, this.state.eastAsian ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>East Asian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toggleHispanicLatino()}
                        style={[styles.checkButton, this.state.hispanicLatino ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Hispanic/Latino</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toggleMiddleEastern()}
                        style={[styles.checkButton, this.state.middleEastern ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Middle Eastern</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.togglePacificIslander()}
                        style={[styles.checkButton, this.state.pacificIslander ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Pacific Islander</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toggleSouthAsian()}
                        style={[styles.checkButton, this.state.southAsian ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>South Asian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toggleWhite()}
                        style={[styles.checkButton, this.state.white ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>White/Caucasian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toggleOther()}
                        style={[styles.checkButton, this.state.other ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Other</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.nextButtonPosition}>
                    <TouchableHighlight
                        style={styles.roundButton}
                        underlayColor={'purple'}
                        onPress={() => {
                            if (this.state.americanIndian) {
                                this.props.route.params.ethnicity.push('American Indian')
                            }
                            if (this.state.black) {
                                this.props.route.params.ethnicity.push('Black/African Descent')
                            }
                            if (this.state.eastAsian) {
                                this.props.route.params.ethnicity.push('East Asian')
                            }
                            if (this.state.hispanicLatino) {
                                this.props.route.params.ethnicity.push('Hispanic/Latino')
                            }
                            if (this.state.middleEastern) {
                                this.props.route.params.ethnicity.push('Middle Eastern')
                            }
                            if (this.state.pacificIslander) {
                                this.props.route.params.ethnicity.push('Pacific Islander')
                            }
                            if (this.state.southAsian) {
                                this.props.route.params.ethnicity.push('South Asian')
                            }
                            if (this.state.white) {
                                this.props.route.params.ethnicity.push('White/Caucasian')
                            }
                            if (this.state.other) {
                                this.props.route.params.ethnicity.push('Other')
                            }
                            this.props.navigation.push('Confirm', this.props.route.params)
                        }}
                    >
                        <FontAwesome name={'chevron-right'} size={30} color='white' />
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}
