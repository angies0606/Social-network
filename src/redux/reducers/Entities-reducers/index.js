import {combineReducers} from 'redux';
import entitiesCommentsReducer from './entities-comments.reducer.js';
import entitiesPostsReducer from './entities-posts.reducer.js';

const entitiesReducer = combineReducers({
  posts: entitiesPostsReducer,
  comments: entitiesCommentsReducer
});

export default entitiesReducer;