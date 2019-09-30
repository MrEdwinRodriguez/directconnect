import axios from 'axios';
import { ADD_POSITION, GET_ERRORS, GET_POSITIONS, POSITION_LOADING,  DELETE_POSITION , GET_POSITION, CLEAR_ERRORS} from './types';







//get all positions hiring
export const  getPositionsHiring = () => dispatch => {
    dispatch(setPositionLoading());
    axios
        .get("/api/profile/hiring")
        .then(res => 
            dispatch({
                type: GET_POSITIONS,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type: GET_POSITIONS,
                payload: null
            })
            );
}

//get all positions hiring by orginization
export const getPositionsHiringByOrginization = (orginization) => dispatch => {
    // dispatch(setProfileLoading());
    axios
        .get(`/api/profile/hiring/orginization/${orginization}`)
        .then(res => 
            dispatch({
                // type: GET_PROFILES,
                payload: res.data
            })
            )
            .catch(err => 
                dispatch({
                    // type: GET_PROFILES,
                    payload: null
                })
                );
     
}

export const setPositionLoading = () => {
    return {
       type: POSITION_LOADING 
    }
}