import API from '../../api/index';

import * as actionTypes from './actionTypes';

export const getGame = (gameData) => {
  return {
    type: actionTypes.GET_GAME,
    gameData,
  };
};

export const getUsersCoordinates = (usersCoordinates) => {
  return {
    type: actionTypes.GET_USERS_COORDINATES,
    usersCoordinates,
  };
};

export const getGameData = (gameId) => {
  return (dispatch) => {
    API.get('/games/' + gameId)
      .then((response) => {
        dispatch(getGame(response.data.game));
        dispatch(getUsersCoordinatesData(gameId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUsersCoordinatesData = (gameId) => {
  return (dispatch) => {
    API.get('/coordinates/' + gameId)
      .then((response) => {
        dispatch(getUsersCoordinates(response.data.coordinates));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
