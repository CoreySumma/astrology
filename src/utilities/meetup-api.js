// We aren't using this file yet, but we might in the future.

import axios from 'axios';

async function getMeetUp() {
  try {
    const response = await axios.get('');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  return response.data; 
}