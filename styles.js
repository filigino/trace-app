import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    confirmTextbox: {
        margin: 5
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 40,
        paddingTop: 80
    },
    ethnicityButton: {
        alignItems: 'center',
        backgroundColor: '#624480',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        margin: 5,
        paddingHorizontal: 10
    },
    heading: {
        fontSize: 20,
        textAlign: 'center'
    },
    nextButtonPosition: {
        alignItems: 'flex-end',
        marginBottom: 40,
        marginRight: 40
    },
    roundButton: {
        alignItems: 'center',
        backgroundColor: '#624480',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 35,
        borderWidth: 1,
        height: 70,
        justifyContent: 'center',
        width: 70
    },
    splash: {
        alignItems: 'center',
        backgroundColor: 'rebeccapurple',
        flex: 1,
        justifyContent: 'center'
    },
    squaredButton: {
        alignItems: 'center',
        backgroundColor: '#624480',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
        borderWidth: 1,
        height: 44,
        justifyContent: 'center',
        margin: 5,
        paddingHorizontal: 10
    },
    textbox: {
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        height: 44,
        margin: 5,
        paddingHorizontal: 5
    },
    textboxIconPositionA: {
        bottom: 15,
        position: 'absolute',
        right: 12
    },
    textboxIconPositionB: {
        bottom: 15,
        position: 'absolute',
        right: 45
    },
    xorButton: {
        alignItems: 'center',
        flex: 1/2,
        height: 70,
        margin: 5,
        justifyContent: 'center'
    }
})
