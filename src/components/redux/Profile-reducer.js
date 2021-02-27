const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE"
let initialState = {
  postsData: [
    {id: 1, message: "Привет! Yo!", likesCount: 5}, 
    {id: 2, message: "ПРИВЕТ! Круто:)", likesCount: 8}
  ],
  newPostText: "",
  profile: null
};

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_POST: 
      let newPost = {
      id: 5,
      message: state.newPostText,
      likesCount: 0
    };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: ""
      };
    case UPDATE_NEW_POST_TEXT: 
      return {
        ...state,
        newPostText: action.newText
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    default:
      return state;
  }
}

export const addPostCreator = () => ({
  type: ADD_POST
}); // можно писать в одну строку

export const updateNewPostTextCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT, 
    newText: text 
  }
}
export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE, 
    profile
  }
}

export default profileReducer;