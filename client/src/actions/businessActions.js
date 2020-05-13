import axios from 'axios';
import { BUSINESS_LOADING, CLEAR_CURRENT_BUSINESS, GET_ERRORS, GET_BUSINESSES, GET_BUSINESS, GET_PROFILE, GET_BUSINESSES_CRITERIA, DELETE_BUSINESS } from './types';

//add business
export const addBusiness = (businessDate, history) => dispatch => {
    axios
        .post("/api/business", businessDate)
        .then(res => history.push("/dashboard"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

//get all business
export const  getBusinesses = () => dispatch => {
    dispatch(setBusinessLoading());
    axios
        .get("/api/business")
        .then(res => 
            dispatch({
                type:  GET_BUSINESSES,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type:  GET_BUSINESSES,
                payload: null
            })
            );
}

//get one business
export const getBusiness = (id) => dispatch => {
    dispatch(setBusinessLoading());
    axios
        .get(`/api/business/${id}`)
        .then(res => 
            dispatch({
                type: GET_BUSINESS,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: GET_BUSINESS,
                    payload: null
                })
            );
}

//update business
export const updateBusiness = (id, businessData, history) => dispatch => {
    axios
        .put(`/api/business/${id}`, businessData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}


//delete business
export const  deleteBusiness = (id) => dispatch => {
    axios
        .delete(`/api/business/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}

//profile loading
export const setBusinessLoading = () => {
    return {
        type: BUSINESS_LOADING
    }
}

//clear profile
export const clearCurrentBusiness = () => {
    return {
        type: CLEAR_CURRENT_BUSINESS
    }
}