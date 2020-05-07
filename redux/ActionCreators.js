import * as SecureStore from 'expo-secure-store'
import {Alert} from 'react-native'
import {url} from '../url'

export const checkToken = () => (dispatch) => {
    SecureStore.getItemAsync('token')
    .then((token) => {
        if (token) {
            fetch(url + 'users', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((res) => {
                if (res.headers.get('content-type').includes('application/json')) {
                    return res.json()
                } else if (res.headers.get('content-type') === 'text/plain') {
                    return res.text()
                }
            })
            .then((res) => {
                if (res.username) {
                    dispatch(restoreToken(token))
                } else {
                    SecureStore.deleteItemAsync('token')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    })
    .then(() => dispatch(hideSplash()))
}

export const logIn = (username, password, rememberMe) => (dispatch) => {
    fetch(url + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
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
            dispatch(restoreToken(res.token))
            SecureStore.setItemAsync('token', res.token)
            if (rememberMe) {
                SecureStore.setItemAsync('userLogin', JSON.stringify({username, password}))
            } else {
                SecureStore.deleteItemAsync('userLogin')
            }
        } else {
            Alert.alert(
                'Error',
                'Incorrect username/password'
            )
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

export const logOut = () => (dispatch) => {
    dispatch(destroyToken())
    SecureStore.deleteItemAsync('token')
}

export const restoreToken = (token) => ({
    type: 'RESTORE_TOKEN',
    token
})

export const destroyToken = () => ({
    type: 'DESTROY_TOKEN'
})

export const hideSplash = () => ({
    type: 'HIDE_SPLASH'
})

export const activateButton = () => ({
    type: 'STYLE_BUTTON',
    color: '#624480',
    activeOpacity: 0.2,
    active: true
})

export const deactivateButton = () => ({
    type: 'STYLE_BUTTON',
    color: 'gray',
    activeOpacity: 1,
    active: false
})

export const showButton = () => ({
    type: 'TOGGLE_BUTTON_VISIBILITY',
    visible: true
})

export const hideButton = () => ({
    type: 'TOGGLE_BUTTON_VISIBILITY',
    visible: false
})

// export const fetchLocations = () => (dispatch) => {
//     return firestore.collection('locations').get()
//         .then(snapshot => {
//             let locations = []
//             snapshot.forEach(doc => {
//                 const data = doc.data()
//                 const id = doc.id
//                 locations.push({id, ...data})
//             })
//             return locations
//         })
//         .then(locations => dispatch(addLocations(locations)))
//         .catch(error => {
//             dispatch(locationsFailed(error.message))
//         })
// }

// export const locationsFailed = (errMess) => ({
//     type: 'LOCATIONS_FAILED',
//     errMess
// })

// export const addLocations = (locations) => ({
//     type: 'ADD_LOCATIONS',
//     locations
// })

// dispatch in second parenthesis bc only inner function gets access to dispatch method (from Thunk)
// export const fetchDrinks = () => (dispatch) => {
//     return firestore.collection('drinks').get()
//         .then(snapshot => {
//             let drinks = []
//             snapshot.forEach(doc => {
//                 const data = doc.data()
//                 const id = doc.id
//                 drinks.push({id, ...data})
//             })
//             return drinks
//         })
//         .then(drinks => dispatch(addDrinks(drinks)))
//         .catch(error => {
//             dispatch(drinksFailed(error.message))
//         })
// }

// export const drinksFailed = (errMess) => ({
//     type: 'DRINKS_FAILED',
//     errMess
// })

// export const addDrinks = (drinks) => ({
//     type: 'ADD_DRINKS',
//     drinks
// })

// export const fetchFood = () => (dispatch) => {
//     return firestore.collection('food').get()
//         .then(snapshot => {
//             let food = []
//             snapshot.forEach(doc => {
//                 const data = doc.data()
//                 const id = doc.id
//                 food.push({id, ...data})
//             })
//             return food
//         })
//         .then(food => dispatch(addFood(food)))
//         .catch(error => {
//             dispatch(foodFailed(error.message))
//         })
// }

// export const foodFailed = (errMess) => ({
//     type: 'FOOD_FAILED',
//     errMess
// })

// export const addFood = (food) => ({
//     type: 'ADD_FOOD',
//     food
// })
