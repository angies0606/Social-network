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

export default userPageReducer;