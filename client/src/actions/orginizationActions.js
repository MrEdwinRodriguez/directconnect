
import axios from 'axios';
import { GET_ERRORS, GET_ORGINIZATION_EMAIL_INFO} from './types';

export const getUserAssociatedChapters = () => dispatch => {
     axios.get('api/orginization/getEmailList')
     .then(res => 
        dispatch({
            type: GET_ORGINIZATION_EMAIL_INFO,
            payload: res.data
        })) 
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
 }



