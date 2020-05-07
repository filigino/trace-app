import React from 'react'
import {connect} from 'react-redux'
import {activateButton, deactivateButton} from '../../../redux/ActionCreators'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'

const mapDispatchToProps = (dispatch) => ({
    activateButton: () => dispatch(activateButton()),
    deactivateButton: () => dispatch(deactivateButton())
})

class Ethnicity extends React.Component {
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
            other: false,
            skip: false
        }
    }

    componentDidMount() {
        this.props.deactivateButton()
        this.props.navigation.setParams({ethnicity: []})
    }

    onToggleAmericanIndian() {
        this.setState({americanIndian: !this.state.americanIndian}, () => {
            this.styleButton()
            if (this.state.americanIndian) {
                this.props.route.params.ethnicity.push('American Indian')
            } else {
                this.props.navigation.setParams({ethnicity: this.props.route.params.ethnicity.filter((ethnicity) => ethnicity !== 'American Indian')})
            }
        })
        this.deactivateSkip()
    }

    onToggleBlack() {
        this.setState({black: !this.state.black}, () => {
            this.styleButton()
            if (this.state.black) {
                this.props.route.params.ethnicity.push('Black/African Descent')
            } else {
                this.props.navigation.setParams({ethnicity: this.props.route.params.ethnicity.filter((ethnicity) => ethnicity !== 'Black/African Descent')})
            }
        })
        this.deactivateSkip()
    }

    onToggleEastAsian() {
        this.setState({eastAsian: !this.state.eastAsian}, () => {
            this.styleButton()
            if (this.state.eastAsian) {
                this.props.route.params.ethnicity.push('East Asian')
            } else {
                this.props.navigation.setParams({ethnicity: this.props.route.params.ethnicity.filter((ethnicity) => ethnicity !== 'East Asian')})
            }
        })
        this.deactivateSkip()
    }

    onToggleHispanicLatino() {
        this.setState({hispanicLatino: !this.state.hispanicLatino}, () => {
            this.styleButton()
            if (this.state.hispanicLatino) {
                this.props.route.params.ethnicity.push('Hispanic/Latino')
            } else {
                this.props.navigation.setParams({ethnicity: this.props.route.params.ethnicity.filter((ethnicity) => ethnicity !== 'Hispanic/Latino')})
            }
        })
        this.deactivateSkip()
    }

    onToggleMiddleEastern() {
        this.setState({middleEastern: !this.state.middleEastern}, () => {
            this.styleButton()
            if (this.state.middleEastern) {
                this.props.route.params.ethnicity.push('Middle Eastern')
            } else {
                this.props.navigation.setParams({ethnicity: this.props.route.params.ethnicity.filter((ethnicity) => ethnicity !== 'Middle Eastern')})
            }
        })
        this.deactivateSkip()
    }

    onTogglePacificIslander() {
        this.setState({pacificIslander: !this.state.pacificIslander}, () => {
            this.styleButton()
            if (this.state.pacificIslander) {
                this.props.route.params.ethnicity.push('Pacific Islander')
            } else {
                this.props.navigation.setParams({ethnicity: this.props.route.params.ethnicity.filter((ethnicity) => ethnicity !== 'Pacific Islander')})
            }
        })
        this.deactivateSkip()
    }

    onToggleSouthAsian() {
        this.setState({southAsian: !this.state.southAsian}, () => {
            this.styleButton()
            if (this.state.southAsian) {
                this.props.route.params.ethnicity.push('South Asian')
            } else {
                this.props.navigation.setParams({ethnicity: this.props.route.params.ethnicity.filter((ethnicity) => ethnicity !== 'South Asian')})
            }
        })
        this.deactivateSkip()
    }

    onToggleWhite() {
        this.setState({white: !this.state.white}, () => {
            this.styleButton()
            if (this.state.white) {
                this.props.route.params.ethnicity.push('White/Caucasian')
            } else {
                this.props.navigation.setParams({ethnicity: this.props.route.params.ethnicity.filter((ethnicity) => ethnicity !== 'White/Caucasian')})
            }
        })
        this.deactivateSkip()
    }

    onToggleOther() {
        this.setState({other: !this.state.other}, () => {
            this.styleButton()
            if (this.state.other) {
                this.props.route.params.ethnicity.push('Other')
            } else {
                this.props.navigation.setParams({ethnicity: this.props.route.params.ethnicity.filter((ethnicity) => ethnicity !== 'Other')})
            }
        })
        this.deactivateSkip()
    }

    deactivateSkip() {
        if (this.state.skip) {
            this.setState({skip: false})
        }   
    }

    onToggleSkip() {
        this.setState({skip: !this.state.skip}, () => {
            if (this.state.skip) {
                this.setState({americanIndian: false})
                this.setState({black: false})
                this.setState({eastAsian: false})
                this.setState({hispanicLatino: false})
                this.setState({middleEastern: false})
                this.setState({pacificIslander: false})
                this.setState({southAsian: false})
                this.setState({white: false})
                this.setState({other: false})
                this.props.navigation.setParams({ethnicity: []})
            }
            this.styleButton()
        })
    }

    styleButton() {
        if (
            this.state.skip
            || this.state.americanIndian
            || this.state.black
            || this.state.eastAsian
            || this.state.hispanicLatino
            || this.state.middleEastern
            || this.state.pacificIslander
            || this.state.southAsian
            || this.state.white
            || this.state.other
        ) {
            this.props.activateButton()
        } else {
            this.props.deactivateButton()
        }
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>What is your ethnicity?</Text>
                <ScrollView style={{top: 5}}>
                    <View style={[{
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }, this.state.skip ? {opacity: 0.2} : {}]}>
                        <TouchableOpacity
                            onPress={() => this.onToggleAmericanIndian()}
                            style={[
                                styles.squaredButton,
                                this.state.americanIndian ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>American Indian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onToggleBlack()}
                            style={[
                                styles.squaredButton,
                                this.state.black ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>Black/African Descent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onToggleEastAsian()}
                            style={[
                                styles.squaredButton,
                                this.state.eastAsian ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>East Asian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onToggleHispanicLatino()}
                            style={[
                                styles.squaredButton,
                                this.state.hispanicLatino ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>Hispanic/Latino</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onToggleMiddleEastern()}
                            style={[
                                styles.squaredButton,
                                this.state.middleEastern ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>Middle Eastern</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onTogglePacificIslander()}
                            style={[
                                styles.squaredButton,
                                this.state.pacificIslander ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>Pacific Islander</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onToggleSouthAsian()}
                            style={[
                                styles.squaredButton,
                                this.state.southAsian ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>South Asian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onToggleWhite()}
                            style={[
                                styles.squaredButton,
                                this.state.white ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>White/Caucasian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onToggleOther()}
                            style={[
                                styles.squaredButton,
                                this.state.other ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>Other</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => this.onToggleSkip()}
                            style={[
                                styles.squaredButton,
                                this.state.skip ? {backgroundColor: '#624480'} : {backgroundColor: 'gray'}
                            ]}
                        >
                            <Text style={{color: 'white'}}>I'd rather not say</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Ethnicity)
