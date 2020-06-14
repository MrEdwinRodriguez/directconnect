
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
      .then(res => history.push('/login'))
      .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      })
    );
}

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            console.log('callback')
            //save to local storage
            const  { token } = res.data;
            //set token to local storage
            localStorage.setItem('jwtToken', token);
            //set token to auth header
            setAuthToken(token);
            //decode tokento get user data
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };

  export const resetPassword = (email, history) => dispatch => {
      axios.post('api/users/reset_password', email)
      .then(res => console.log('reset request sent'))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      );
  }
