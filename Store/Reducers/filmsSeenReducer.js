// Store/Reducers/filmsSeenReducer.js

const initialState = { FilmsSeen: [] }

function toggleSeen(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_SEEN':
      const filmsSeenIndex = state.FilmsSeen.findIndex(item => item.id === action.value.id)
      if (filmsSeenIndex !== -1) {
        // Le film est déjà dans les vus, on le supprime de la liste
        nextState = {
          ...state,
          FilmsSeen: state.FilmsSeen.filter( (item, index) => index !== filmsSeenIndex)
        }
      }
      else {
        // Le film n'est pas dans les films vus, on l'ajoute à la liste
        nextState = {
          ...state,
          FilmsSeen: [...state.FilmsSeen, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleSeen
