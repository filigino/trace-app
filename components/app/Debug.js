import React from 'react'
import {connect} from 'react-redux'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {clearOldIDs, clearAllIDs, setSelfReportStatus} from '../../redux/ActionCreators'

const mapStateToProps = (state) => ({
    state,
    IDs: state.IDs
})

const mapDispatchToProps = (dispatch) => ({
    clearOldIDs: () => dispatch(clearOldIDs()),
    clearAllIDs: () => dispatch(clearAllIDs()),
    setSelfReportStatus: (status) => dispatch(setSelfReportStatus(status))
})

const Debug = (props) => {
    const {myIDs} = props.IDs
    const {otherIDs} = props.IDs
    const {styles} = props.route.params

    // Note curly braces around 'item' to indicate it's a JS object
    const renderID = ({item}) => {
        return (
            <View style={{alignItems: 'center'}}>
                <Text>{item.ID}</Text>
                <Text>{new Date(item.timestamp).toString()}</Text>
            </View>
        )
    }

    return (
        <View style={{backgroundColor: 'white'}}>
            <TouchableOpacity
                onPress={() => {
                    console.log(props.state)
                }}
                style={styles.squaredButton}
            >
                <Text style={{color: 'white'}}>Print State to Console</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.setSelfReportStatus(false)
                }}
                style={styles.squaredButton}
            >
                <Text style={{color: 'white'}}>Reset Self-Report Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.clearOldIDs()
                }}
                style={styles.squaredButton}
            >
                <Text style={{color: 'white'}}>Clear Old</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.clearAllIDs()
                }}
                style={styles.squaredButton}
            >
                <Text style={{color: 'white'}}>Clear All</Text>
            </TouchableOpacity>
            <Text>My IDs</Text>
            <FlatList
                data={myIDs}
                renderItem={renderID}
                keyExtractor={(item) => item.ID}
            />
            <Text>Other IDs</Text>
            <FlatList
                data={otherIDs}
                renderItem={renderID}
                keyExtractor={(item) => item.ID}
            />
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Debug)
