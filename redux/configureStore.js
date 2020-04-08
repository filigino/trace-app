import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import food from './reducers/food'
import drinks from './reducers/drinks'
import locations from './reducers/locations'
import {persistCombineReducers, persistStore} from 'redux-persist'
import {AsyncStorage} from 'react-native'

const configureStore = () => {
    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }

    const store = createStore(
        persistCombineReducers(config, {
            food,
            drinks,
            locations
        }),
        applyMiddleware(thunk)
    )

    const persistor = persistStore(store)

    return {persistor, store}
}

export default configureStore
