import initialState from "@redux/store/initial-state";
import {
  PUT_POSTS,
  DELETE_POST,
  EDIT_POST,
  SET_LIKE,
  PUT_COMMENTS,
  DELETE_COMMENT,
  SET_POSTS
} from "@redux/actions/post.actions.js";

function entitiesPostsReducer(state = initialState.entities.posts, action) {
  switch (action.type) {
    case PUT_POSTS:
    case SET_POSTS:  {
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
    case SET_LIKE: {
      const newState = {
        ...state
      };
      const postId = action.data._id;
      newState[postId] = {
        ...action.data
      }
      return newState;
    }
    
    case PUT_COMMENTS: {
      const newState = {
        ...state
      };
      const comments = action.data.commentsData;
      comments.forEach(comment => {
        if (newState[comment.post].comments.includes(comment._id)) {
          return;
        }
        newState[comment.post] = {
          ...newState[comment.post],
          comments: [...newState[comment.post].comments, comment._id],
          nComments: action.data.nComments
        }
      })
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = {
        ...state
      };
      const commentId = action.data.deletedComment._id;
      const postId = action.data.deletedComment.post;
      const comments = newState[postId].comments;
      comments.splice(comments.indexOf(commentId), 1);
      newState[postId] = {
        ...newState[postId],
        nComments: action.data.nComments
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