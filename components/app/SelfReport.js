import React from 'react'
import {connect} from 'react-redux'
import {Alert, Switch, Text, TouchableOpacity, View} from 'react-native'
import {url} from '../../url'
import {clearOldIDs, setSelfReportStatus} from '../../redux/ActionCreators'

const mapStateToProps = (state) => ({
    myIDs: state.IDs.myIDs,
    selfReported: state.settings.selfReported
})

const mapDispatchToProps = (dispatch) => ({
    clearOldIDs: () => dispatch(clearOldIDs()),
    setSelfReportStatus: (status) => dispatch(setSelfReportStatus(status))
})

class SelfReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selfReportingIsEnabled: false
        }
    }

    confirmAlert() {
        if (this.state.selfReportingIsEnabled) {
            Alert.alert(
                'Confirm',
                'I confirm I have tested positive for COVID-19 and would like to notify my Public Health Authority.\n\n(This cannot be undone)',
                [{
                    text: 'Cancel',
                    onPress: () => this.setState({selfReportingIsEnabled: false}),
                    style: 'cancel',
                }, {
                    text: 'Confirm',
                    onPress: () => this.selfReport(),
                    style: 'destructive'
                }]
            )
        }
    }

    selfReport() {
        const IDs = this.props.myIDs
        this.props.clearOldIDs()
        fetch(url + 'infections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IDs
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
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'space-evenly'}}>
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
                        style={[styles.squaredButton, {backgroundColor: this.state.selfReportingIsEnabled ? '#624480' : 'gray'}]}
                    >
                        <Text style={{color: 'white'}}>I have COVID-19</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelfReport)
