import { stopSubmit } from "redux-form";
import { authAPI } from "@api/api.js";
import { getAuthUserData } from "@redux/reducers/auth-reducer.js";
import initialState from "@redux/store/initial-state";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

const appReducer = (state = initialState.app, action) => {
  switch(action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
}

export const initializedSuccess = () => {
  return {
    type: INITIALIZED_SUCCESS
  }
}

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise
  .all([promise])
  .then(() => {
    dispatch(initializedSuccess);
  });
  
} 

export default appReducer;    
