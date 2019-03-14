// Store/Reducers/favoritesTvShowReducer.js

const initialState = { favoritesTvShow: [] }

function toggleFavoriteTvShow(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteTvShowIndex = state.favoritesTvShow.findIndex(item => item.id === action.value.id)
      if (favoriteTvShowIndex !== -1) {
        // La serie est déjà dans les favoris, on la supprime de la liste
        nextState = {
          ...state,
          favoritesTvShow: state.favoritesTvShow.filter( (item, index) => index !== favoriteTvShowIndex)
        }
      }
      else {
        // La serie n'est pas dans les series favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesTvShow: [...state.favoritesTvShow, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavoriteTvShow
