import {applyMiddleware, createStore} from 'redux'
import {persistCombineReducers, persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import {AsyncStorage} from 'react-native'
import uuids from './reducers/uuids'

const configureStore = () => {
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage
    }

    const store = createStore(
        persistCombineReducers(persistConfig, {
            uuids
        }),
        applyMiddleware(thunk)
    )

    const persistor = persistStore(store)

    return {persistor, store}
}

export default configureStore
