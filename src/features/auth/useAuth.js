// @ts-nocheck

import {useEffect, useReducer} from 'react';
import {authApi} from '@api/api-n';

const initialState = {
  user: null,
  isAuthed: false,
  isInitialized: false
}

const SET_AUTHED = 'SET_AUTHED';
function setAuthedActionCreator(user) {
  return {
    type: SET_AUTHED,
    data: user
  }
}

const SET_UNAUTHED = 'SET_UNAUTHED';
function setUnauthedActionCreator() {
  return {
    type: SET_UNAUTHED
  }
}

function authReducer(state , action) {
  switch(action.type) {
    case SET_AUTHED:
      return {
        user: action.data,
        isAuthed: true,
        isInitialized: true
      }
    case SET_UNAUTHED: 
      return {
        user: null,
        isAuthed: false,
        isInitialized: true
      }
    default: return state;
  }
}


function useAuth() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  //Проверяем один раз авторизирован ли пользователь
  useEffect(() => {
    check();
  },[])

  function login(nickname, password) {
    authApi.login(nickname, password)
    .then(user => {
      if(!user) {
        dispatch(setUnauthedActionCreator());
      }
      dispatch(setAuthedActionCreator(user));
    })
    .catch((e) => {
      dispatch(setUnauthedActionCreator());
    })
  }

  function logout () {
    authApi.logout()
      .then(() => {
        dispatch(setUnauthedActionCreator());
      })
  }

  function check () {
    authApi.me()
    .then(user => {
      if(!user) {
        dispatch(setUnauthedActionCreator());
      }
      dispatch(setAuthedActionCreator(user));
    })
    .catch((e) => {
      dispatch(setUnauthedActionCreator());
    })
  }

  return {
    state,
    login,
    logout,
    check
  }
}

export default useAuth;