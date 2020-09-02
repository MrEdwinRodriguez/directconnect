import axios from 'axios';
import { ADMIN_GET_CHAPTERS, ADMIN_GET_CHAPTER, ADMIN_LOADING, CLEAR_ERRORS, ADMIN_GET_ORGINIZATIONS, GET_ERRORS, ADMIN_ADD_CHAPTER } from './types';

//get chapters
export const adminGetChapters = () => dispatch => {
    dispatch(setAdminLoading());
    axios
        .get("/api/admin/chapters")
        .then(res => 
            dispatch({
                type: ADMIN_GET_CHAPTERS,
                payload: res.data
            })
            )
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                );
     
}

//get one chapter
export const adminGetChapter = (id) => dispatch => {
    dispatch(setAdminLoading());
    axios
        .get(`/api/admin/chapter/${id}`)
        .then(res => 
            dispatch({
                type: ADMIN_GET_CHAPTER,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: ADMIN_GET_CHAPTER,
                    payload: null
                })
            );
}

//update chapter
export const updateChapters = (id, chapterData) => dispatch => {
    axios
        .put(`/api/admin/chapter/${id}`, chapterData)
        .then(res => 
            dispatch({
                type: ADMIN_GET_CHAPTER,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: ADMIN_GET_CHAPTER,
                    payload: null
                })
            );
}

//add chapter
export const addChapter = (chapterData) => dispatch => {
    axios
        .post(`/api/admin/chapter`, chapterData)
        .then(res => 
            dispatch({
                type: ADMIN_ADD_CHAPTER,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: ADMIN_GET_CHAPTER,
                    payload: null
                })
            );
}

//get orginizations
export const getOrginizations = () => dispatch => {
    dispatch(setAdminLoading());
    axios
        .get("/api/admin/orginizations")
        .then(res => 
            dispatch({
                type: ADMIN_GET_ORGINIZATIONS,
                payload: res.data
            })
            )
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                );
     
}

//set loading state
export const setAdminLoading = () => {
    return {
        type: ADMIN_LOADING
    }
}

//clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}