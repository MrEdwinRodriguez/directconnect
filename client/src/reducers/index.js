import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import experienceReducer from './experienceReducer';
import postReducer from './postReducer';
import positionReducer from './positionReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    experience: experienceReducer,
    post: postReducer,
    position: positionReducer
})