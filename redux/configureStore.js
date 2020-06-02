import {applyMiddleware, createStore} from 'redux'
import {persistCombineReducers, persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import {AsyncStorage} from 'react-native'
import IDs from './reducers/IDs'
import settings from './reducers/settings'

const configureStore = () => {
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage
    }

    const store = createStore(
        persistCombineReducers(persistConfig, {
            IDs,
            settings
        }),
        applyMiddleware(thunk)
    )

    const persistor = persistStore(store)

    return {persistor, store}
}

export default configureStore
