import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 40
    },
    splash: {
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        flex: 1,
        justifyContent: 'center'
    },
    splashImage: {
        height: 200,
        width: 200
    },
    squaredButton: {
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
        borderWidth: 1,
        height: 44,
        justifyContent: 'center',
        margin: 5,
        paddingHorizontal: 10
    }
})
