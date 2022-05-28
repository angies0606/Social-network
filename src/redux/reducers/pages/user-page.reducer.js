import initialState from "@redux/store/initial-state";
import {
  PUT_POSTS,
  DELETE_POST,
  SET_POSTS
} from "@redux/actions/post.actions.js";
import {
  SET_USER
} from "@redux/actions/users.actions";

function userPageReducer(state = initialState.pages.userPage, action) {
  switch (action.type) {
    case PUT_POSTS: {
      return {
        ...state,
        posts: [
          ...state.posts,
          ...action.data.map(post => post._id).filter(postId => !state.posts.includes(postId))
        ]
      }
    }
    case SET_POSTS: {
      return {
        ...state,
        posts: [
          ...action.data.map(post => post._id)//.filter(postId => !state.posts.includes(postId))
        ]
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