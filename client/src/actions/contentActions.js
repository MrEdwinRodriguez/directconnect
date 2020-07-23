import axios from 'axios';
import { GET_BLOGS, GET_BLOG, CONTENT_LOADING, GET_ERRORS, GET_PODCAST, GET_PODCASTS } from './types';

//get all business
export const  getBlogs = () => dispatch => {
    dispatch(setBlogLoading());
    axios
        .get("/api/content/blogs")
        .then(res => 
            dispatch({
                type:  GET_BLOGS,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

//get one blog
export const getBlog = (id) => dispatch => {
    dispatch(setBlogLoading());
    axios
        .get(`/api/content/blog/${id}`)
        .then(res => 
            dispatch({
                type: GET_BLOG,
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

//get all business
export const  getPodcasts = () => dispatch => {
    dispatch(setBlogLoading());
    axios
        .get("/api/content/podcasts")
        .then(res => 
            dispatch({
                type:  GET_PODCASTS,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

//get one Podcast
export const getPodcast = (id) => dispatch => {
    dispatch(setBlogLoading());
    axios
        .get(`/api/content/podcast/${id}`)
        .then(res => 
            dispatch({
                type: GET_PODCAST,
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

//profile loading
export const setBlogLoading = () => {
    return {
        type: CONTENT_LOADING
    }
}