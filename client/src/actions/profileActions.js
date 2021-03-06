import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES, GET_EXPERIENCE, GET_EDUCATION, GET_PROFILES_CRITERIA, GET_IMAGE_URL } from './types';


//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: GET_PROFILE,
                    payload: {}
                })
            );
}

//Get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());

    axios
        .get(`/api/profile/handle/${handle}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: GET_PROFILE,
                    payload: null
                })
            );
}

//create profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post("/api/profile", profileData)
        .then(res => history.push(`/myprofile/${profileData.handle}`))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}

//create profile
export const uploadProfileImage = (file, config, history) => dispatch => {
    axios
        .post("/api/profile/upload", file, config)
        .then(res =>             
            dispatch({
                type: GET_PROFILE,
                payload: res.data
        })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        )
}

//update experience
export const deleteProfileImage = (profileData) => dispatch => {
    axios
        .post("/api/profile/delete/profile_image", profileData)
        .then(res =>             
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}

//create profile
export const uploadCreateProfileImage = (file, config, history) => dispatch => {
    axios
        .post("/api/profile/upload", file, config)
        .then(res =>             
            dispatch({
                type: GET_IMAGE_URL,
                payload: res.data
        })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        )
}

//add experience
export const  addExperience = (expData, history) => dispatch => {
    axios
        .post("/api/profile/experience", expData)
        .then(res => history.push("/dashboard"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}

//get one experience
export const getExperience = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/experience/${id}`)
        .then(res => 
            dispatch({
                type: GET_EXPERIENCE,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: GET_EXPERIENCE,
                    payload: null
                })
            );
}

//update experience
export const updateExperience = (id, experienceData, history) => dispatch => {
    axios
        .put(`/api/profile/experience/${id}`, experienceData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}

//delete experience
export const  deleteExperience = (id) => dispatch => {
    axios
        .put(`/api/profile/delete/experience/${id}`)
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
            );
}

//get one experience
export const getEducation = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/education/${id}`)
        .then(res => 
            dispatch({
                type: GET_EDUCATION,
                payload: res.data
            })
            )
            .catch(err =>
                dispatch({
                    type: GET_EDUCATION,
                    payload: null
                })
            );
}

//add education
export const  addEducation = (eduData, history) => dispatch => {
    axios
        .post("/api/profile/education", eduData)
        .then(res => history.push("/dashboard"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}
//update education
export const updateEducation = (id, educationData, history) => dispatch => {
    axios
        .put(`/api/profile/education/${id}`, educationData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            )
}

//delete education
export const  deleteEducation = (id) => dispatch => {
    axios
        .put(`/api/profile/education/delete/${id}`)
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
            );
}


//add hiring
export const  addHiring = (hiringData, history) => dispatch => {
    axios
        .post("/api/profile/hiring", hiringData)
        .then(res => history.push("/dashboard"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
            );
}


//get all profiles
export const  getProfiles = (skip) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get("/api/profile/all", {
            params: {
                limit: 25,
                skip: skip,
               }
        })
        .then(res => 
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            }))
        .catch(err => 
            dispatch({
                type: GET_PROFILES,
                payload: null
            })
            );
}

export const getProfilesByOrginization = (orginization, skip) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/orginization/${orginization}`, {
            params: {
                limit: 25,
                skip: skip,
               }
        })
        .then(res => 
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
            )
            .catch(err => 
                dispatch({
                    type: GET_PROFILES,
                    payload: null
                })
                );
     
}

//get profiles by search criteria
export const getProfilesBySearchCriteria = (criteria, org, skip) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/search/${criteria}`, {
        params: {
            limit: 25,
            skip: skip,
            org: org,
           }
    })
    .then(res => 
        dispatch({
                type: GET_PROFILES_CRITERIA,
                payload: res.data
        }))
        .catch(err => 
            dispatch({
                type: GET_PROFILES_CRITERIA,
                payload: null
            }))

}


//Delete account & profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you sure you want to delete your account?  This cannot be undone!')) {
        axios
            .delete('/api/profile')
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
                ).catch(err => 
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                );
    }
};

//profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}