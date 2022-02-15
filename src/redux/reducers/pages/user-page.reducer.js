import initialState from "@redux/store/initial-state";
import {
  PUT_POSTS,
  DELETE_POST
} from '@redux/actions.js';

function userPageReducer(state = initialState.pages.userPage, action) {
  switch (action.type) {
    case PUT_POSTS: {
      return {
        posts: [
          ...state.posts,
          ...action.data.map(post => post._id)
        ]
      } 
    }
    case DELETE_POST: {
      const postId = action.data;
      const newState = {...state};
      newState.posts.splice(newState.posts.indexOf(postId), 1);
      return newState;
    }
    
    default:
      return state;
  }
}

export default userPageReducer;