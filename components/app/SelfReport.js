import React from 'react'
import {connect} from 'react-redux'
import {Alert, Switch, Text, TouchableOpacity, View} from 'react-native'
import {url} from '../../url'
import {clearOldIDs} from '../../redux/ActionCreators'

const mapStateToProps = (state) => ({
    myIDs: state.uuids.myIDs
})

const mapDispatchToProps = (dispatch) => ({
    clearOldIDs: () => dispatch(clearOldIDs())
})

class SelfReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEnabled: false
        }
    }

    confirmAlert() {
        if (this.state.isEnabled) {
            Alert.alert(
                'Confirm',
                'I confirm I have tested positive for COVID-19 and would like to notify my Public Health Authority.\n\n(This cannot be undone)',
                [{
                    text: 'Cancel',
                    onPress: () => this.setState({isEnabled: false}),
                    style: 'cancel',
                }, {
                    text: 'Confirm',
                    onPress: () => this.selfReport()
                }]
            )
        }
    }

    selfReport() {
        const {myIDs} = this.props
        this.props.clearOldIDs()
        fetch(url + 'infected', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                myIDs
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
                Alert.alert('Success')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.containerApp}>
                <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Enable self reporting</Text>
                        <Switch
                            onValueChange={() => this.setState({isEnabled: !this.state.isEnabled})}
                            value={this.state.isEnabled}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => this.confirmAlert()}
                        activeOpacity={this.state.isEnabled ? 0.2 : 1}
                        color={this.state.isEnabled ? '#624480' : 'gray'}
                        style={[styles.squaredButton, {backgroundColor: this.state.isEnabled ? '#624480' : 'gray'}]}
                    >
                        <Text style={{color: 'white'}}>I have COVID-19</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelfReport)
