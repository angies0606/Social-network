import { combineReducers } from "redux";
import entitiesCommentsReducer from "./entities-comments.reducer.js";
import entitiesPostsReducer from "./entities-posts.reducer.js";
import entitiesUsersReducer from "./entities-users.reducer.js";

const entitiesReducer = combineReducers({
  posts: entitiesPostsReducer,
  comments: entitiesCommentsReducer,
  users: entitiesUsersReducer
});

export default entitiesReducer;