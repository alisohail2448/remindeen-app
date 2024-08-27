import { combineReducers } from "redux";
import userReducer from "./userReducer";
import counterReducer from "./counterReducer";

const myReducer = combineReducers({
    user: userReducer,
    counter: counterReducer
})

export default myReducer;