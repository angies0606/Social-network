import {combineReducers} from 'redux';
// import commentsReducer from './entities-comments.reducer.js';
import postsReducer from './entities-posts.reducer.js';

const postsEntitiesReducer = combineReducers({
  posts: postsReducer,
  // comments: commentsReducer
});

export default postsEntitiesReducer;