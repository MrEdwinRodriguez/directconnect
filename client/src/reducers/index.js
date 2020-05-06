import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import experienceReducer from './experienceReducer';
import educationceReducer from './educationReducer';
import postReducer from './postReducer';
import positionReducer from './positionReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    experience: experienceReducer,
    education: educationceReducer,
    post: postReducer,
    position: positionReducer
})