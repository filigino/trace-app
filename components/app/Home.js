import React from 'react'
import {connect} from 'react-redux'
import ContactTracing from 'react-native-contact-tracing'
import {NativeEventEmitter, NativeModules, Switch, Text, View} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {addMyID, addOtherID, clearOldIDs, setTracingStatus} from '../../redux/ActionCreators'

const mapStateToProps = (state) => ({
    tracingIsEnabled: state.settings.tracingIsEnabled
})

const mapDispatchToProps = (dispatch) => ({
    addMyID: (ID) => dispatch(addMyID(ID)),
    addOtherID: (ID) => dispatch(addOtherID(ID)),
    clearOldIDs: () => dispatch(clearOldIDs()),
    setTracingStatus: (status) => dispatch(setTracingStatus(status))
})

class Home extends React.Component {
    componentDidMount() {
        this.props.clearOldIDs()
        const eventEmitter = new NativeEventEmitter(NativeModules.ContactTracing)
        this.advertiseListener = eventEmitter.addListener('Advertise', (ID) => {
            this.props.addMyID(ID)
        })
        this.discoveryListener = eventEmitter.addListener('Discovery', (ID) => {
            this.props.addOtherID(ID)
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
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                    <View style={{flex: 1/2, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name={icon} size={150} color={'black'} onPress={() => console.log('WHOA')}/>
                    </View>
                    <View style={{flex: 1/2, justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Text style={styles.heading}>
                            {this.props.tracingIsEnabled ? 'Contact tracing is ON' : 'Contact tracing is OFF'}
                        </Text>
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
