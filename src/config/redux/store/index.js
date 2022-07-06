import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import Reducer from "../reducer";

const composedEnhancer = applyMiddleware(thunkMiddleware);

export const store = createStore(Reducer, composedEnhancer);
