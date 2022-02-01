import {combineReducers} from 'redux';
// import commentsReducer from './entities-comments.reducer.js';
import entitiesPostsReducer from './entities-posts.reducer.js';

const entitiesReducer = combineReducers({
  posts: entitiesPostsReducer,
  // comments: commentsReducer
});

export default entitiesReducer;