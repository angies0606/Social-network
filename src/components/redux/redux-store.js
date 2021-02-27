import {combineReducers, createStore} from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./Dialogs-reducer";
import profileReducer from "./Profile-reducer";
import sidebarReducer from "./Sidebar-reducer";
import usersReducer from "./Users-reducer";

let reducers = combineReducers({
  profilePage: profileReducer ,
  dialogsPage: dialogsReducer,
  sidebarPage: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer
});

let store = createStore(reducers);
window.store = store;

export default store;