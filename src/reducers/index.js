import { combineReducers } from "@reduxjs/toolkit";
import userData from "./userData";

const rootReducer = combineReducers({
  userData,
});

export default rootReducer;