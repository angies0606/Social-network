import {reducer as formReducer} from "redux-form";
import appReducer from "../reducers/app-reducer.js";
import authReducer from "@redux/reducers/auth-reducer.js";
import dialogsReducer from "@redux/reducers/Dialogs-reducer.js";
import profileReducer from "@redux/reducers/Profile-reducer.js";
import postsReducer from "@redux/reducers/Posts-reducers/Posts-reducer.js";
import postsEntitiesReducer from "@redux/reducers/Posts-reducers/post-entities/index.js"
import sidebarReducer from "@redux/reducers/Sidebar-reducer.js";
import usersReducer from "@redux/reducers/Users-reducer";
import {combineReducers} from "redux";

let reducers = combineReducers({
  profilePage: profileReducer ,
  posts: postsReducer,
  postsEntities: postsEntitiesReducer,
  dialogsPage: dialogsReducer,
  sidebarPage: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

export default reducers;