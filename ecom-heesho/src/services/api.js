import axios from 'axios';
import { USER_API_BASE } from '../components/misc/constants';

const API = axios.create({
  baseURL: USER_API_BASE, // use the constant here
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    console.log('Setting auth token in API headers',token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
   console.log(axios.defaults.headers.common['Authorization']);

  } else {
    console.log('Removing auth token from API headers');
    delete axios.defaults.headers.common['Authorization'];   
  }
};

export default API;
