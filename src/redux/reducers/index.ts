import { combineReducers } from "redux";
import { covid19 } from "./covid19Reducer";

export const rootReducer = combineReducers({ covid19 });
