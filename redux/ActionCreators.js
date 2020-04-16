import {baseUrl} from '../baseUrl'

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
