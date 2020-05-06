import {applyMiddleware, createStore} from 'redux'
import {persistCombineReducers, persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import {AsyncStorage} from 'react-native'
import auth from './reducers/auth'
import drinks from './reducers/drinks'
import food from './reducers/food'
import locations from './reducers/locations'
import signUpNextButton from './reducers/signUpNextButton'

const configureStore = () => {
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        blacklist: ['auth', 'signUpNextButton']
    }

    const store = createStore(
        persistCombineReducers(persistConfig, {
            auth,
            drinks,
            food,
            locations,
            signUpNextButton
        }),
        applyMiddleware(thunk)
    )

    const persistor = persistStore(store)

    return {persistor, store}
}

export default configureStore
