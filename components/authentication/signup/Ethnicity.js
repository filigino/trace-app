import React from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'

export default class Ethnicity extends React.Component {
    componentDidMount() {
        this.props.navigation.setParams({
            ethnicity: [],
            americanIndian: false,
            black: false,
            eastAsian: false,
            hispanicLatino: false,
            middleEastern: false,
            pacificIslander: false,
            southAsian: false,
            white: false,
            other: false
        })
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.container}>
                <Text>Ethnicity</Text>
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.setParams({americanIndian: !this.props.route.params.americanIndian})}
                        style={[styles.checkButton, this.props.route.params.americanIndian ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>American Indian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.setParams({black: !this.props.route.params.black})}
                        style={[styles.checkButton, this.props.route.params.black ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Black/African Descent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.setParams({eastAsian: !this.props.route.params.eastAsian})}
                        style={[styles.checkButton, this.props.route.params.eastAsian ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>East Asian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.setParams({hispanicLatino: !this.props.route.params.hispanicLatino})}
                        style={[styles.checkButton, this.props.route.params.hispanicLatino ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Hispanic/Latino</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.setParams({middleEastern: !this.props.route.params.middleEastern})}
                        style={[styles.checkButton, this.props.route.params.middleEastern ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Middle Eastern</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.setParams({pacificIslander: !this.props.route.params.pacificIslander})}
                        style={[styles.checkButton, this.props.route.params.pacificIslander ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Pacific Islander</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.setParams({southAsian: !this.props.route.params.southAsian})}
                        style={[styles.checkButton, this.props.route.params.southAsian ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>South Asian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.setParams({white: !this.props.route.params.white})}
                        style={[styles.checkButton, this.props.route.params.white ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>White/Caucasian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.setParams({other: !this.props.route.params.other})}
                        style={[styles.checkButton, this.props.route.params.other ? {backgroundColor: 'purple'} : {backgroundColor: 'lightgrey'}]}
                    >
                        <Text>Other</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
