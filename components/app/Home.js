import React from 'react'
import {connect} from 'react-redux'
import ContactTracing from 'react-native-contact-tracing'
import {NativeEventEmitter, NativeModules, Switch, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {addMyId, addOtherId, setTracingStatus} from '../../redux/ActionCreators'

const mapStateToProps = (state) => ({
    tracingIsEnabled: state.settings.tracingIsEnabled
})

const mapDispatchToProps = (dispatch) => ({
    addMyId: (id) => dispatch(addMyId(id)),
    addOtherId: (id) => dispatch(addOtherId(id)),
    setTracingStatus: (status) => dispatch(setTracingStatus(status))
})

class Home extends React.Component {
    componentDidMount() {
        const eventEmitter = new NativeEventEmitter(NativeModules.ContactTracing)
        this.advertiseListener = eventEmitter.addListener('Advertise', (id) => {
            this.props.addMyId(id)
        })
        this.discoveryListener = eventEmitter.addListener('Discovery', (id) => {
            this.props.addOtherId(id)
        })
        if (this.props.tracingIsEnabled) {
            this.startTracing()
        }
    }

    componentWillUnmount() {
        this.advertiseListener.remove()
        this.discoveryListener.remove()
        this.stopTracing()
    }

    startTracing() {
        ContactTracing.start()
        .catch((err) => console.log(err))
    }

    stopTracing() {
        ContactTracing.stop()
        .catch((err) => console.log(err))
    }

    render() {
        let icon = this.props.tracingIsEnabled ? 'cellphone-wireless' : 'cellphone-off'
        const {styles} = this.props.route.params
        return (
            <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
                <View style={{
                    alignItems: 'center', flex: 1, justifyContent: 'center',
                    marginLeft: this.props.tracingIsEnabled ? 50 : 0
                }}>
                    <Icon name={icon} size={150} color={'black'} />
                </View>
                <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                    <Text style={{fontSize: 20, marginLeft: 20}}>
                        {this.props.tracingIsEnabled ? 'Contact Tracing is ON' : 'Contact Tracing is OFF'}
                    </Text>
                    <View style={{alignSelf: 'center'}}>
                        <Switch
                            value={this.props.tracingIsEnabled}
                            onValueChange={() => {
                                ContactTracing.isEnabled()
                                .then((isEnabled) => {
                                    if (isEnabled) {
                                        this.stopTracing()
                                    } else {
                                        this.startTracing()
                                    }
                                    this.props.setTracingStatus(!this.props.tracingIsEnabled)
                                })
                                .catch((err) => console.log(err))
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
