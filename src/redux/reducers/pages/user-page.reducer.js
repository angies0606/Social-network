import initialState from "@redux/store/initial-state";
import {
  ADD_POSTS,
  DELETE_POST,
  SET_POSTS,
  NEW_POST
} from "@redux/actions/post.actions.js";
import {
  SET_USER
} from "@redux/actions/users.actions";

function userPageReducer(state = initialState.pages.userPage, action) {
  switch (action.type) {
    case NEW_POST: {
      const newState = {
        ...state,
        posts: [
          action.data._id,
          ...state.posts
        ]
      };
      return newState;
    }

    case ADD_POSTS: {
      const newState = {
        ...state,
        posts: [
          ...state.posts,
          ...action.data.map(post => post._id)
        ]
      };
      return newState;
    }

    case SET_POSTS: {
      return {
        ...state,
        posts: action.data.map(post => post._id)
      }
    }

    case DELETE_POST: {
      const postId = action.data;
      const posts = [...state.posts];
      posts.splice(state.posts.indexOf(postId), 1);
      return {
        ...state,
        posts
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