import React from 'react'
import {connect} from 'react-redux'
import ContactTracing from 'react-native-contact-tracing'
import {Alert, NativeEventEmitter, NativeModules, Switch, Text, View} from 'react-native'
import {logMyID, logOtherID, clearOldIDs, setTracingStatus} from '../../redux/ActionCreators'

const mapStateToProps = (state) => ({
    tracingIsEnabled: state.settings.tracingIsEnabled
})

const mapDispatchToProps = (dispatch) => ({
    logMyID: (id) => dispatch(logMyID(id)),
    logOtherID: (id) => dispatch(logOtherID(id)),
    clearOldIDs: () => dispatch(clearOldIDs()),
    setTracingStatus: (status) => dispatch(setTracingStatus(status))
})

class Home extends React.Component {
    componentDidMount() {
        const eventEmitter = new NativeEventEmitter(NativeModules.ContactTracing)
        this.advertiseListener = eventEmitter.addListener('Advertise', (id) => {
            this.props.logMyID(id)
        })
        this.discoveryListener = eventEmitter.addListener('Discovery', (id) => {
            this.props.logOtherID(id)
        })
    }

    componentWillUnmount() {
        this.advertiseListener.remove()
        this.discoveryListener.remove()
    }

    startTracing() {
        ContactTracing.start()
        this.props.setTracingStatus(true)
    }

    stopTracing() {
        ContactTracing.stop()
        this.props.setTracingStatus('false')
    }

    render() {
        const {styles} = this.props.route.params
        return (
            <View style={styles.containerApp}>
                <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>Enable contact tracing</Text>
                        <Switch
                            value={this.props.tracingIsEnabled}
                            onValueChange={() => {
                                if (!this.props.tracingIsEnabled) {
                                    this.startTracing()
                                } else {
                                    this.stopTracing()
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Home)
