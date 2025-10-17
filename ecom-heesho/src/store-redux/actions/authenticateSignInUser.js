import { login } from '../../services/authService';
import { setAuthToken } from '../../services/api';

export const authenticateSignInUser = (credentials, toast, reset, navigate, setLoader) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  setLoader(true);

  try {
    const { user, token } = await login(credentials);
    const userName = user.userName;
    // Save token for future requests
    setAuthToken(token);
    localStorage.setItem("token", token); 
    localStorage.setItem("userName", JSON.stringify(userName));
    localStorage.setItem("ROLES", user.roles); // Store roles in localStorage
    // Example after successful login and fetching user info
    localStorage.setItem('userId', user.userId); // ✅ Correct


    console.log('inside authenticate user',userName,user.userId,token,user.roles);

    // Dispatch user info to Redux
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    console.log('Authenticated User from Boot:', user);
    // Show success, reset form, navigate
    toast.success('Login successful!');
    reset();
   
    navigate('/dashboard');
  } catch (error) {
    toast.error(error.message || 'Login failed');
    dispatch({ type: 'LOGIN_FAILURE', error: error.message });
  } finally {
    setLoader(false);
  }
};
