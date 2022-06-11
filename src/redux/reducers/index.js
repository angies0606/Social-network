import { reducer as formReducer } from "redux-form";
import pagesReducer from "@redux/reducers/pages/index.js";
import entitiesReducer from "@redux/reducers/Entities-reducers/index.js"
import { combineReducers } from "redux";

let reducers = combineReducers({
  pages: pagesReducer,
  entities: entitiesReducer,
  form: formReducer
});

export default reducers;