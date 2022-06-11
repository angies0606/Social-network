import initialState from "@redux/store/initial-state";
import {
  DELETE_POST,
  EDIT_POST,
  SET_LIKE,
  PUT_COMMENTS,
  DELETE_COMMENT,
  SET_POSTS,
  ADD_POST
} from "@redux/actions/post.actions.js";

function entitiesPostsReducer(state = initialState.entities.posts, action) {
  switch (action.type) {
    case ADD_POST:
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
        ...post
      }
      return newState;
    }

    case SET_LIKE: {
      const newState = {
        ...state
      };
      const postId = action.data._id;
      newState[postId] = {
        ...newState[postId],
        ...action.data
      };
      return newState;
    }

    case PUT_COMMENTS: {
      const newState = {
        ...state
      };
      const comments = action.data.commentsData;

      comments.forEach(comment => {
        if (newState[comment.post].comments?.includes(comment._id)) {
          return;
        }
        newState[comment.post] = {
          ...newState[comment.post],
          comments: [...(newState[comment.post].comments || []), comment._id, ],
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
    
    default:
      return state;
  }
}

export default entitiesPostsReducer;