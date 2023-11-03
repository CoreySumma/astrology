// Fetch to our AWS gateway endpoint that triggers our Lambda function
// which grabs the users ip address and if it's not there stores it in our DynamoDB table
// if it is there it returns a flag to let us know it's already there.
// the table will save ip address, date, and last prediciton made

import axios from "axios";

export default async function awsApi() {
  try {
    // Get user IP address
    const ipRes = await axios.get("https://corsproxy.io/?https://api.ipify.org?format=json");
    const ipAddress = ipRes.data.ip;
    // Send ip address to our AWS gateway endpoint
    const res = await axios.post(
      "https://mfx5wug1gl.execute-api.us-east-2.amazonaws.com/default/checkAndSave",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        ipAddress: ipAddress,
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error making AWS call - ", error);
  }
}

