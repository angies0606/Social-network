import initialState from "@redux/store/initial-state";
import {
  PUT_COMMENTS,
  DELETE_COMMENT
} from '@redux/actions/post.actions.js'

function entitiesCommentsReducer(state = initialState.entities.comments, action) {
  switch (action.type) {
    case PUT_COMMENTS: {
      const newState = {
        ...state
      };
      const comments = action.data;
      comments.forEach(comment => {
        newState[comment._id] = comment
      })
      return newState;
    }
    
    case DELETE_COMMENT: {
      const newState = {
        ...state
      };
      const commentId = action.data._id;
      delete newState[commentId];
      return newState;
    }

    default:
      return state;
  }
}

export default entitiesCommentsReducer;