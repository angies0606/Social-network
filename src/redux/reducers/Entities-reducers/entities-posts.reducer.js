import initialState from "@redux/store/initial-state";
import {
  PUT_POSTS,
  DELETE_POST,
  EDIT_POST,
  ADD_LIKE
} from '@redux/actions.js';

function entitiesPostsReducer(state = initialState.entities.posts, action) {
  switch (action.type) {
    case PUT_POSTS: {
      const newState = {
        ...state
      };
      action.data.forEach(post => {
        newState[post._id] = post;
      });
      return newState;
    }
    case DELETE_POST: {
      const newState = {
        ...state
      };
      const postId = action.data;
      delete newState[postId];
      return newState;
    }
    case EDIT_POST: {
      const newState = {
        ...state
      };
      const post = action.data;
      newState[post._id] = {
        ...newState[post._id],
        text: post.text,
        image: post.image
      }
      return newState;
    }
    case ADD_LIKE: {
      const newState = {
        ...state
      };
      const postId = action.data.post._id;
      const newLike = action.data.like._id;
      newState[postId] = {
        ...newState[postId],
        likes: [...newState[postId].likes, newLike]
      }
      return newState;
    }
    
    
    // case PUT_TODO_LISTS: {
    //   return [
    //     ...state,
    //     ...action.data.map(todoList => todoList.id).filter(todoListId => !state.includes(todoListId))
    //   ]
    // }

    // case DELETE_TODO_LIST: {
    //   const {todoListId} = action.data;
    //   const newState = [...state];
    //   newState.splice(newState.indexOf(todoListId), 1);
    //   return newState;
    // }
    
    default:
      return state;
  }
}

export default entitiesPostsReducer;