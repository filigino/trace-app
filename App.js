import React from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'
import configureStore from './redux/configureStore'
import Main from './components/Main'

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
