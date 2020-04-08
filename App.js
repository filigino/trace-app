import React from 'react'
import Main from './components/Main'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import {PersistGate} from 'redux-persist/es/integration/react'

const {persistor, store} = configureStore()

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate
                persistor={persistor}
            >
                <Main />
            </PersistGate>
        </Provider>
    )
}

export default App
