
import axios from 'axios';
import { GET_ERRORS, GET_ORGINIZATION_EMAIL_INFO, GET_CHAPTERS} from './types';

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

 //add business
export const sendEmail = (emailData, history) => dispatch => {
    axios
        .post("api/orginization/sendEmail", emailData)
        .then(res => history.push("/send-email"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

 //get chapters
 export const getChapters = () => dispatch => {
    axios
        .get(`api/orginization/chapters`)
        .then(res =>             
            dispatch({
                type: GET_CHAPTERS,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: { msg: "error", status: 400 }
            })
            );
}

