import * as actionTypes from '../actions/actionTypes';

const initialState = {
  game: {},
  coordinates: [],
};

const getGame = (state, action) => {
  return {
    ...state,
    game: {
      ...action.gameData,
    },
  };
};

const getUsersCoordinates = (state, action) => {
  return {
    ...state,
    coordinates: [...action.usersCoordinates],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GAME:
      return getGame(state, action);
    case actionTypes.GET_USERS_COORDINATES:
      return getUsersCoordinates(state, action);
    default:
      return state;
  }
};

export default reducer;
