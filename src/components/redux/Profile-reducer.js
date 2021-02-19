const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
  postsData: [
    {id: 1, message: "Привет! Yo!", likesCount: 5}, 
    {id: 2, message: "ПРИВЕТ! Круто:)", likesCount: 8}
  ],
  newPostText: ""
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

export default profileReducer;