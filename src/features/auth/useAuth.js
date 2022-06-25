// @ts-nocheck
import { useEffect, useMemo, useReducer, useCallback } from "react";
import { authApi } from "@api/api";

const initialState = {
  user: null,
  isAuthed: false,
  isInitialized: false
};

const SET_AUTHED = 'SET_AUTHED';
function setAuthedActionCreator(user) {
  return {
    type: SET_AUTHED,
    data: user
  }
};

const SET_UNAUTHED = 'SET_UNAUTHED';
export function setUnauthedActionCreator() {
  return {
    type: SET_UNAUTHED
  }
};

let _dispatch;

function authReducer(state , action) {
  switch(action.type) {
    case SET_AUTHED:
      let obj = {
        user: action.data,
        isAuthed: true,
        isInitialized: true
      }
      console.log(obj);
    return obj;
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

  const register = useCallback((email, nickname, password) => {
    return authApi.register(email, nickname, password)
  }, []);

  const login = useCallback((nickname, password) => {
    return authApi.login(nickname, password)
      .then(user => {
        if(!user) {
          dispatch(setUnauthedActionCreator());
        }
        dispatch(setAuthedActionCreator(user));
      })
      .catch((e) => {
        dispatch(setUnauthedActionCreator());
      });
  }, []);

  const logout = useCallback(() => {
    return authApi.logout()
      .then(() => {
        dispatch(setUnauthedActionCreator());
      });
  }, []);

  const check = useCallback(() => {
    return authApi.me()
      .then(user => {
        if(!user) {
          dispatch(setUnauthedActionCreator());
        }
        dispatch(setAuthedActionCreator(user));
      })
      .catch((e) => {
        dispatch(setUnauthedActionCreator());
      });
  }, []);

  const changeUserData = useCallback(user => {
    return dispatch(setAuthedActionCreator(user));
  }, []);

  //Проверяем один раз авторизирован ли пользователь
  useEffect(() => {
    check();
  },[]);

  const result = useMemo(() => ({
    state,
    register,
    login,
    logout,
    check,
    changeUserData
  }), [
    state,
    register,
    login,
    logout,
    check,
    changeUserData
  ]);

  _dispatch = dispatch;
 
  return result;
}

export default useAuth;

export function getDispatch() {
  return _dispatch;
}

