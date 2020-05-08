import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import experienceReducer from './experienceReducer';
import educationceReducer from './educationReducer';
import postReducer from './postReducer';
import positionReducer from './positionReducer';
import businessReducer from './businessReducer';
import hireReducer from './hireReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    experience: experienceReducer,
    education: educationceReducer,
    hire: hireReducer,
    post: postReducer,
    position: positionReducer,
    business: businessReducer,
})