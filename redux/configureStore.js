import {applyMiddleware, createStore} from 'redux'
import {persistCombineReducers, persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import {AsyncStorage} from 'react-native'
import exposures from './reducers/exposures'
import launch from './reducers/launch'
import ids from './reducers/ids'
import settings from './reducers/settings'

const configureStore = () => {
    const persistConfig = {
        key: 'root',
        storage: AsyncStorage,
        blacklist: ['launch']
    }

    const store = createStore(
        persistCombineReducers(persistConfig, {
            exposures,
            launch,
            ids,
            settings
        }),
        applyMiddleware(thunk)
    )

    const persistor = persistStore(store)

    return {persistor, store}
}

export default configureStore
