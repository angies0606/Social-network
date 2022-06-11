import initialState from "@redux/store/initial-state";
import {
  ADD_POST,
  DELETE_POST,
  SET_POSTS
} from "@redux/actions/post.actions.js";
import {
  SET_USER
} from "@redux/actions/users.actions";

function userPageReducer(state = initialState.pages.userPage, action) {
  switch (action.type) {
    case ADD_POST: {
      const [{_id: newPostId}] = action.data;
      return {
        ...state,
        posts: [
          newPostId,
          ...state.posts
        ]
      }
    }

    case SET_POSTS: {
      return {
        ...state,
        posts: [
          ...action.data.map(post => post._id)
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