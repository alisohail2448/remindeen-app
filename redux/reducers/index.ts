import { combineReducers } from "redux";
import userReducer from "./userReducer";
import counterReducer from "./counterReducer";
import signInReducer from "./signInReducer";

const myReducer = combineReducers({
    signIn: signInReducer, 
    user: userReducer,
    counter: counterReducer
})

export default myReducer;