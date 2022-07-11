import API from '../../api/index';

import * as actionTypes from './actionTypes';

const AUTH_EXPIRATION_TIME_SECONDS = 43200;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const login = (login, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const loginData = {
      login,
      password,
    };
    API.post('/api/auth/login', loginData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + AUTH_EXPIRATION_TIME_SECONDS * 1000
        );
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.userId);
        dispatch(authSuccess(response.data.token, response.data.userId));
        dispatch(checkAuthTimeout(AUTH_EXPIRATION_TIME_SECONDS));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
        console.log(err);
      });
  };
};

export const registration = (
  nickname,
  email,
  password,
  passwordConfirmation,
  country,
  region,
  city
) => {
  return (dispatch) => {
    // dispatch(authStart());
    const registrationData = {
      nickname,
      email,
      password,
      passwordConfirmation,
      country,
      region,
      city,
    };
    API.put('/api/auth/signup', registrationData)
      .then(() => {
        dispatch(setAuthRedirectPatch('/login'));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
        console.log(err);
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const setAuthRedirectPatch = (patch) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATCH,
    patch,
  };
};
