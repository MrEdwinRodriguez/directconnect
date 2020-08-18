import axios from 'axios';
import { ADMIN_GET_CHAPTERS, ADMIN_GET_CHAPTER, ADMIN_LOADING, CLEAR_ERRORS, GET_ERRORS } from './types';

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