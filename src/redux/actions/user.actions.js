export const SET_USER = 'SET_USER';
export const setUserActionCreator = (user) => {
  return {
    type: SET_USER, 
    data: user
  }
}