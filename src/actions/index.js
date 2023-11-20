// Action Types
export const UPDATE_SIGN = 'UPDATE_SIGN';
export const UPDATE_DATE = 'UPDATE_DATE';
export const UPDATE_TIME = 'UPDATE_TIME';
export const UPDATE_TEMP = 'UPDATE_TEMP';
export const UPDATE_PREDICTION = 'UPDATE_PREDICTION';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_DAY = 'UPDATE_DAY';
export const UPDATE_BUSINESS_NAME = 'UPDATE_BUSINESS_NAME';
export const UPDATE_BUSINESS_LOCATION = 'UPDATE_BUSINESS_LOCATION';
export const UPDATE_REFINED_PREDICTION = 'UPDATE_REFINED_PREDICTION';
export const UPDATE_USER_EXISTS = 'UPDATE_USER_EXISTS';
export const UPDATE_LAST_DATE_VISITED = 'UPDATE_LAST_DATE_VISITED';
export const UPDATE_LAST_PREDICTION = 'UPDATE_LAST_PREDICTION';
export const UPDATE_FINAL_PREDICTION = 'UPDATE_FINAL_PREDICTION';
export const UPDATE_SHORTENED_PREDICTION = 'UPDATE_SHORTENED_PREDICTION';


// Action Creators
export const updateSign = (sign) => {
  return {
    type: UPDATE_SIGN,
    payload: sign,
  };
};

export const updateDate = (date) => {
  return {
    type: UPDATE_DATE,
    payload: date,
  };
}

export const updateTime = (time) => {
  return {
    type: UPDATE_TIME,
    payload: time,
  };
}

export const updateTemp = (temp) => {
  return {
    type: UPDATE_TEMP,
    payload: temp,
  };
}

export const updateDescription = (description) => {
  return {
    type: UPDATE_DESCRIPTION,
    payload: description,
  };
}

export const updatePrediction = (prediction) => {
  return {
    type: UPDATE_PREDICTION,
    payload: prediction,
  };
}

export const updateLocation = (location) => {
  return {
    type: UPDATE_LOCATION,
    payload: location,
  };
}

export const updateDay = (day) => {
  return {
    type: UPDATE_DAY,
    payload: day,
  };
}

export const updateBusinessName = (businessName) => {
  return {
    type: UPDATE_BUSINESS_NAME,
    payload: businessName,
  };
}

export const updateBusinessLocation = (businessLocation) => {
  return {
    type: UPDATE_BUSINESS_LOCATION,
    payload: businessLocation,
  };
}
export const updateRefinedPrediction = (refinedPrediction) => {
  return {
    type: UPDATE_REFINED_PREDICTION,
    payload: refinedPrediction,
  };
}

export const updateUserExists = (userExists) => {
  return {
    type: UPDATE_USER_EXISTS,
    payload: userExists,
  };
}

export const updateLastDateVisited = (lastDateVisited) => {
  return {
    type: UPDATE_LAST_DATE_VISITED,
    payload: lastDateVisited,
  };
}

export const updateLastPrediction = (lastPrediction) => {
  return {
    type: UPDATE_LAST_PREDICTION,
    payload: lastPrediction,
  };
}
export const updateFinalPrediction = (finalPrediction) => {
  return {
    type: UPDATE_FINAL_PREDICTION,
    payload: finalPrediction,
  };
}
export const updateShortenedPrediction = (shortenedPrediction) => {
  return {
    type: UPDATE_SHORTENED_PREDICTION,
    payload: shortenedPrediction,
  };
}

