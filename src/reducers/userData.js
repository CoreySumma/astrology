import {
  UPDATE_SIGN,
  UPDATE_DATE,
  UPDATE_TIME,
  UPDATE_TEMP,
  UPDATE_PREDICTION,
} from "../actions/index";

const intializeState = {
  signData: "",
  date: "",
  time: "",
  temp: null,
  location: "",
  prediction: "",
};

const userData = (state = intializeState, action) => {
  switch (action.type) {
    case UPDATE_SIGN:
      console.log("Handling UPDATE_SIGN action", action);
      return {
        ...state,
        signData: action.payload,
      };
    case UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case UPDATE_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case UPDATE_TEMP:
      return {
        ...state,
        temp: action.payload,
      };
    case UPDATE_PREDICTION:
      return {
        ...state,
        prediction: action.payload,
      };
    default:
      return state;
  }
};

export default userData;
