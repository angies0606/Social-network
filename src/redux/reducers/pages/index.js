import {combineReducers} from 'redux';
import userPageReducer from './user-page.reducer.js';

const pagesReducer = combineReducers({
  userPage: userPageReducer,
});

export default pagesReducer;