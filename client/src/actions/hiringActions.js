import axios from 'axios';
import { ADD_POST, GET_ERRORS, HIRE_LOADING, CLEAR_ERRORS, GET_HIRE, DELETE_HIRE, GET_PROFILE, GET_POSITIONS, GET_POSITIONS_CRITERIA, POSITION_LOADING, GET_POSITION} from './types';

//add Post
//add hiring
export const  addHiring = (hiringData, history) => dispatch => {
    axios
        .post("/api/hire", hiringData)
        .then(res => history.push("/dashboard"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

//get one hire
export const getHiring = (id) => dispatch => {
    dispatch(setHireLoading());
    axios
        .get(`/api/hire/${id}`)
        .then(res => 
            dispatch({
                type: GET_HIRE,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: GET_HIRE,
                    payload: null
                })
            );
}

//get all positions hiring
export const  getPositionsHiring = () => dispatch => {
    dispatch(setHireLoading());
    axios
        .get("/api/hire")
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

//get by search crietria
export const  getPositionsBySearchCriteria = (crietria) => dispatch => {
    // dispatch(setHireLoading());
    axios
        .get(`/api/hire/search/${crietria}`)
        .then(res => 
            dispatch({
                type: GET_POSITIONS_CRITERIA,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type: GET_POSITIONS_CRITERIA,
                payload: null
            })
            );
}

//Get one  position by id
export const getPositionById = (position) => dispatch => {
    dispatch(setHireLoading());
    axios
        .get(`/api/hire/${position}`)
        .then(res => 
            dispatch({
                type: GET_POSITION,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: GET_POSITION,
                    payload: null
                })
            );
}



//update hiring
export const updateHire = (id, HireData, history) => dispatch => {
    axios
        .put(`/api/hire/${id}`, HireData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}

//delete hiring
export const  deleteHiring = (id) => dispatch => {
    axios
        .delete(`/api/hire/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_HIRE,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
            );
}

//set loading state
export const setHireLoading = () => {
    return {
        type: HIRE_LOADING
    }
}

//clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}