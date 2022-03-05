import initialState from "@redux/store/initial-state";
import {
  PUT_POSTS,
  DELETE_POST
} from '@redux/actions/post.actions.js';
import {
  SET_USER
} from '@redux/actions/user.actions';

function userPageReducer(state = initialState.pages.userPage, action) {
  switch (action.type) {
    case PUT_POSTS: {
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.data.map(post => post._id)
        ]
      }
    }
    case DELETE_POST: {
      const postId = action.data;
      return {
        ...state,
        posts: [...state.posts].splice(state.posts.indexOf(postId), 1)
      };
    }
    case SET_USER: {
      const user = action.data;
      return {
        ...state,
        user
      };
    }
    
    default:
      return state;
  }
}

export default userPageReducer;