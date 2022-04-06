import React from 'react'
import {connect} from 'react-redux'
import {Alert, Switch, Text, TouchableOpacity, View} from 'react-native'
import {url} from '../../url'
import {clearOldMyIds, setSelfReportStatus} from '../../redux/ActionCreators'

const mapStateToProps = (state) => ({
    myIds: state.ids.myIds,
    selfReported: state.settings.selfReported
})

const mapDispatchToProps = (dispatch) => ({
    clearOldMyIds: () => dispatch(clearOldMyIds()),
    setSelfReportStatus: (status) => dispatch(setSelfReportStatus(status))
})

class SelfReport extends React.Component {
    state = {
        selfReportingIsEnabled: false
    }

    confirmAlert() {
        if (this.state.selfReportingIsEnabled) {
            Alert.prompt(
                'Confirm',
                'I confirm I have tested positive for COVID-19 and would like to notify my Public Health Authority.\n\n(This cannot be undone)\n\nEnter \'confirm\' if you agree',
                [{
                    text: 'Cancel',
                    onPress: () => this.setState({selfReportingIsEnabled: false}),
                    style: 'cancel',
                }, {
                    text: 'Confirm',
                    onPress: (text) => (text === 'confirm' ? this.selfReport() : this.setState({selfReportingIsEnabled: false})),
                    style: 'destructive'
                }]
            )
        }
    }

    selfReport() {
        const ids = this.props.myIds
        this.props.clearOldMyIds()
        fetch(url + 'infections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids
            })
        })
        .then((res) => {
            if (res.headers.get('content-type').includes('application/json')) {
                return res.json()
            } else if (res.headers.get('content-type') === 'text/plain') {
                return res.text()
            }
        })
        .then((res) => {
            if (res.success) {
                Alert.alert('Success', 'Please self-isolate until further notice.')
                this.props.setSelfReportStatus(true)
                this.setState({selfReportingIsEnabled: false})
            }
        })
        .catch((err) => {
            Alert.alert('Error', 'Please try again shortly')
            console.log(err)
        })
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>Enable self-reporting</Text>
                    <Switch
                        value={this.state.selfReportingIsEnabled}
                        disabled={this.props.selfReported}
                        onValueChange={() => this.setState({selfReportingIsEnabled: !this.state.selfReportingIsEnabled})}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.confirmAlert()}
                    activeOpacity={this.state.selfReportingIsEnabled ? 0.2 : 1}
                    style={[styles.squaredButton, {backgroundColor: this.state.selfReportingIsEnabled ? 'red' : 'gray'}]}
                >
                    <Text style={{color: 'white'}}>I have COVID-19</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelfReport)
