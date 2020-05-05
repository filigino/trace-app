import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import auth from './reducers/auth'
import drinks from './reducers/drinks'
import food from './reducers/food'
import locations from './reducers/locations'
import nextButton from './reducers/nextButton'
import {persistCombineReducers, persistStore} from 'redux-persist'
import {AsyncStorage} from 'react-native'

const configureStore = () => {
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        blacklist: ['auth', 'nextButton'],
        debug: true
    }

    const store = createStore(
        persistCombineReducers(persistConfig, {
            auth,
            drinks,
            food,
            locations,
            nextButton
        }),
        applyMiddleware(thunk)
    )

    const persistor = persistStore(store)

    return {persistor, store}
}

export default configureStore
