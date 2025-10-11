import API from './api';

export const login = async ({ email, password }) => {
  const basicAuth = 'Basic ' + btoa(`${email}:${password}`);

  const response = await API.get('/login', {
    headers: {
      Authorization: basicAuth,
    },
  });

  const user = response.data;
  const token = response.headers['authorization'] || response.headers['Authorization'];
  console.log('Token from response headers:', token);
  console.log('Completed login API call');

  if (!token) {
    throw new Error('Token not found in response headers');
  }

  return { user, token };
};
