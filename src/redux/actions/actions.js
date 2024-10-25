export const UPDATE_SIGN = 'UPDATE_SIGN';
export const UPDATE_DATE = 'UPDATE_DATE';
export const UPDATE_TIME = 'UPDATE_TIME';
export const UPDATE_DAY = 'UPDATE_DAY';
export const UPDATE_TEMP = 'UPDATE_TEMP';
export const UPDATE_PREDICTION = 'UPDATE_PREDICTION';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_BUSINESS_NAME = 'UPDATE_BUSINESS_NAME';
export const UPDATE_BUSINESS_LOCATION = 'UPDATE_BUSINESS_LOCATION';
export const UPDATE_USER_EXISTS = 'UPDATE_USER_EXISTS';
export const UPDATE_LAST_DATE_VISITED = 'UPDATE_LAST_DATE_VISITED';
export const UPDATE_LAST_PREDICTION = 'UPDATE_LAST_PREDICTION';

export const updateSign = (sign) => ({
  type: UPDATE_SIGN,
  payload: sign,
});

export const updateDate = (date) => ({
  type: UPDATE_DATE,
  payload: date,
});

export const updateTime = (time) => ({
  type: UPDATE_TIME,
  payload: time,
});

export const updateDay = (day) => ({
  type: UPDATE_DAY,
  payload: day,
});

export const updateTemp = (temp) => ({
  type: UPDATE_TEMP,
  payload: temp,
});

export const updateDescription = (description) => ({
  type: UPDATE_DESCRIPTION,
  payload: description,
});

export const updatePrediction = (prediction) => ({
  type: UPDATE_PREDICTION,
  payload: prediction,
});

export const updateLocation = (location) => ({
  type: UPDATE_LOCATION,
  payload: location,
});

export const updateBusinessName = (businessName) => ({
  type: UPDATE_BUSINESS_NAME,
  payload: businessName,
});

export const updateBusinessLocation = (businessLocation) => ({
  type: UPDATE_BUSINESS_LOCATION,
  payload: businessLocation,
});

export const updateUserExists = (userExists) => ({
  type: UPDATE_USER_EXISTS,
  payload: userExists,
});

export const updateLastDateVisited = (lastDateVisited) => ({
  type: UPDATE_LAST_DATE_VISITED,
  payload: lastDateVisited,
});

export const updateLastPrediction = (lastPrediction) => ({
  type: UPDATE_LAST_PREDICTION,
  payload: lastPrediction,
});