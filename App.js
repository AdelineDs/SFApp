// App.js

import React from 'react'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import AppDrawerNavigation from './Navigation/DrawerNavigation'

export default class App extends React.Component {
  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <AppDrawerNavigation/>
        </PersistGate>
      </Provider>
    )
  }
}
