import { profileAPI, usersAPI } from "@api/api.js";
import initialState from "@redux/store/initial-state";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";

// let initialstate = {
//   postsData: [
//     {id: 1, message: "Привет! Yo!", likesCount: 5}, 
//     // {id: 2, message: "ПРИВЕТ! Круто:)", likesCount: 8}
//   ],
//   profile: null,
//   status: ""
// };

const profileReducer = (state = initialState.profilePage.userData, action) => {
  switch(action.type) {

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SET_STATUS:
        return {
          ...state,
          status: action.status
        };
    default:
      return state;
  }
}

export const addPostCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText
}); // можно писать в одну строку

export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE, 
    profile
  }
}

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status
  }
}
// thunk-и 
export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId) 
    .then(response => {
    dispatch(setUserProfile(response.data));
  });
}

export const getUserStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId) 
    .then(response => {
    dispatch(setStatus(response.data));
  });
}

export const updateUserStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status) 
    .then(response => {
      if(response.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
  });
}


export default profileReducer;