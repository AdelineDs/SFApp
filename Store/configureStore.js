// Store/configureStore.js

import { createStore } from 'redux'
import toggleFavorite from './Reducers/favoriteReducer'
import toggleFavoriteTvShow from './Reducers/favoriteTvShowReducer'
import setAvatar from './Reducers/avatarReducer'
import toggleSeen from './Reducers/filmsSeenReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar, toggleSeen, toggleFavoriteTvShow}))
