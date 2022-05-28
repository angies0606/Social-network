import {combineReducers} from "redux";
import userPageReducer from "./user-page.reducer.js";
import usersPageReducer from "./users-page.reducer.js";

const pagesReducer = combineReducers({
  userPage: userPageReducer,
  usersPage: usersPageReducer
});

export default pagesReducer;