import { combineReducers } from "@reduxjs/toolkit";
import userData from "./userData";

const rootReducer = combineReducers({
  userData: userData,
});

export default rootReducer;