import axios from "axios";
import {
  updateUserExists,
  updateLastDateVisited,
  updateLastPrediction,
} from "../redux/actions/actions";

// Check if user has visited before and get their last prediction -
// and if they have, update redux with that information
export async function awsCheckIfVisited(date, dispatch) {
  try {
    const {
      data: { ip: ipAddress },
    } = await axios.get(
      "https://api64.ipify.org?format=json"
    );
    const res = await axios.post(
      "https://mfx5wug1gl.execute-api.us-east-2.amazonaws.com/default/checkAndSave",
      {
        ipAddress,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const { exists, lastDateVisited, pastPrediction } = res.data;
    dispatch(updateUserExists(exists));
    dispatch(updateLastDateVisited(lastDateVisited));
    dispatch(updateLastPrediction(pastPrediction));
  } catch (error) {
    throw new Error(`Error in AWS call: ${error.message}`);
  }
}

// Add prediction to our DynamoDB table using the same endpoint
// eslint-disable-next-line consistent-return
export async function awsAddPrediction(prediction, date) {
  try {
    const {
      data: { ip: ipAddress },
    } = await axios.get(
      "https://api64.ipify.org?format=json"
    );
    axios.post(
      "https://mfx5wug1gl.execute-api.us-east-2.amazonaws.com/default/checkAndSave",
      {
        prediction,
        ipAddress,
        date,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    throw new Error(`Error in AWS call: ${error.message}`);
  }
}
