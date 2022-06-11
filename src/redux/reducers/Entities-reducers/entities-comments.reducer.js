import initialState from "@redux/store/initial-state";
import {
  PUT_COMMENTS,
  DELETE_COMMENT,
  DELETE_POST
} from "@redux/actions/post.actions.js";

function entitiesCommentsReducer(state = initialState.entities.comments, action) {
  switch (action.type) {
    case PUT_COMMENTS: {
      const newState = {
        ...state
      };
      const comments = action.data.commentsData;
      comments.forEach(comment => {
        newState[comment._id] = comment
      })
      return newState;
    }
    
    case DELETE_COMMENT: {
      const newState = {
        ...state
      };
      const commentId = action.data.deletedComment._id;
      delete newState[commentId];
      return newState;
    }
    
    case DELETE_POST: {
      const newState = {
        ...state
      };
      const postId = action.data;
      for (let comment in newState) {
        if(newState[comment].post === postId) {
          delete newState[comment];
        }
      }
      return newState;
    }

    default:
      return state;
  }
}

export default entitiesCommentsReducer;