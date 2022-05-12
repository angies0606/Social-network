import {reducer as formReducer} from "redux-form";
// import authReducer from "@redux/reducers/auth-reducer.js";
import dialogsReducer from "@redux/reducers/Dialogs-reducer.js";
// import userDataReducer from "@redux/reducers/UserData-reducer.js";
import pagesReducer from "@redux/reducers/pages/index.js";
import entitiesReducer from "@redux/reducers/Entities-reducers/index.js"
import sidebarReducer from "@redux/reducers/Sidebar-reducer.js";
import usersReducer from "@redux/reducers/Users-reducer";
import {combineReducers} from "redux";

let reducers = combineReducers({
  // userData: userDataReducer,
  pages: pagesReducer,
  entities: entitiesReducer,
  // dialogsPage: dialogsReducer,
  sidebarPage: sidebarReducer,
  usersPage: usersReducer,
  // auth: authReducer,
  form: formReducer
});

export default reducers;