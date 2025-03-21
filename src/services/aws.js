import {
  updateUserExists,
  updateLastDateVisited,
  updateLastPrediction,
} from "../redux/actions/actions";
import { useAwsApi } from "../utils/helpers";
// User tracking and prediction storage is done through AWS Lambda and DynamoDB

// Check if user has visited before and get their last prediction -
// and if they have, update redux with that information
export async function awsCheckIfVisited(date, dispatch) {
  try {
    const res = await useAwsApi(date, "");
    const { exists, lastDateVisited, pastPrediction } = res.data;
    dispatch(updateUserExists(exists));
    dispatch(updateLastDateVisited(lastDateVisited));
    dispatch(updateLastPrediction(pastPrediction));
  } catch (error) {
    throw new Error(`Error in AWS call: ${error.message}`);
  }
}

// Add prediction to our DynamoDB table using the same endpoint
export async function awsAddPrediction(prediction, date) {
  try {
    await useAwsApi(date, prediction);
  } catch (error) {
    throw new Error(`Error in AWS call: ${error.message}`);
  }
}
