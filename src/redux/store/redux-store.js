import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from '@redux/reducers/index.js';
import initialState from "./initial-state.js";
import { composeWithDevTools } from 'redux-devtools-extension';

let store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
// window.store = store;

export default store;