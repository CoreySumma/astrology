import axios from 'axios';
import { response } from 'express';

async function getMeetUp() {
  try {
    const response = await axios.get('');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  return response; 
}