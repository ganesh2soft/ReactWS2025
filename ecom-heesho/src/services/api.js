import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8082/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    console.log('Setting auth token in API headers',token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   // API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   console.log(axios.defaults.headers.common['Authorization']);

  } else {
    console.log('Removing auth token from API headers');
    delete axios.defaults.headers.common['Authorization'];
   // delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
