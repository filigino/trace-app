import React from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {activateButton, deactivateButton} from '../../../redux/ActionCreators'

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
            this.props.navigation.setParams({americanIndian: this.state.americanIndian})
        })
        this.deactivateSkip()
    }

    onToggleBlack() {
        this.setState({black: !this.state.black}, () => {
            this.styleButton()
            this.props.navigation.setParams({black: this.state.black})
        })
        this.deactivateSkip()
    }

    onToggleEastAsian() {
        this.setState({eastAsian: !this.state.eastAsian}, () => {
            this.styleButton()
            this.props.navigation.setParams({eastAsian: this.state.eastAsian})
        })
        this.deactivateSkip()
    }

    onToggleHispanicLatino() {
        this.setState({hispanicLatino: !this.state.hispanicLatino}, () => {
            this.styleButton()
            this.props.navigation.setParams({hispanicLatino: this.state.hispanicLatino})
        })
        this.deactivateSkip()
    }

    onToggleMiddleEastern() {
        this.setState({middleEastern: !this.state.middleEastern}, () => {
            this.styleButton()
            this.props.navigation.setParams({middleEastern: this.state.middleEastern})
        })
        this.deactivateSkip()
    }

    onTogglePacificIslander() {
        this.setState({pacificIslander: !this.state.pacificIslander}, () => {
            this.styleButton()
            this.props.navigation.setParams({pacificIslander: this.state.pacificIslander})
        })
        this.deactivateSkip()
    }

    onToggleSouthAsian() {
        this.setState({southAsian: !this.state.southAsian}, () => {
            this.styleButton()
            this.props.navigation.setParams({southAsian: this.state.southAsian})
        })
        this.deactivateSkip()
    }

    onToggleWhite() {
        this.setState({white: !this.state.white}, () => {
            this.styleButton()
            this.props.navigation.setParams({white: this.state.white})
        })
        this.deactivateSkip()
    }

    onToggleOther() {
        this.setState({other: !this.state.other}, () => {
            this.styleButton()
            this.props.navigation.setParams({other: this.state.other})
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
                this.props.navigation.setParams({americanIndian: false})
                this.props.navigation.setParams({black: false})
                this.props.navigation.setParams({eastAsian: false})
                this.props.navigation.setParams({hispanicLatino: false})
                this.props.navigation.setParams({middleEastern: false})
                this.props.navigation.setParams({pacificIslander: false})
                this.props.navigation.setParams({southAsian: false})
                this.props.navigation.setParams({white: false})
                this.props.navigation.setParams({other: false})
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
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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
