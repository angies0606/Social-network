export const SET_USER = 'SET_USER';
export const setUserActionCreator = (user) => {
  return {
    type: SET_USER, 
    data: user
  }
}

export const ADD_USERS = 'ADD_USERS';
export const addUsersActionCreator = (users) => {
  return {
    type: ADD_USERS,
    data: users
  }
}