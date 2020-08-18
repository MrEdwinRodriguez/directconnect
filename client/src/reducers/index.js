import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import experienceReducer from './experienceReducer';
import educationceReducer from './educationReducer';
import postReducer from './postReducer';
import contentReducer from './contentReducer';
import positionReducer from './positionReducer';
import businessReducer from './businessReducer';
import hireReducer from './hireReducer';
import adminReducer from './adminReducer';
import orginizationReducer from './orginizationReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    experience: experienceReducer,
    education: educationceReducer,
    content: contentReducer,
    hire: hireReducer,
    post: postReducer,
    position: positionReducer,
    business: businessReducer,
    orginization: orginizationReducer,
    admin: adminReducer,
})