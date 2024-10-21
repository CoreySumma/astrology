import { combineReducers } from "@reduxjs/toolkit";
import userData from "./userReducer";

const rootReducer = combineReducers({
  userData,
});

export default rootReducer;
