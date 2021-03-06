import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST , GET_POST, GET_PINNED, CLEAR_ERRORS} from './types';

//add Post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    axios
        .post("/api/posts", postData)
        .then(res => 
            dispatch({
                type: ADD_POST,
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

//get Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get("/api/posts")
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
            )
            .catch(err => 
                dispatch({
                    type: GET_POSTS,
                    payload: null
                })
                );
     
}

export const getPinned = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get("/api/pinned")
        .then(res => 
            dispatch({
                type: GET_PINNED,
                payload: res.data
            })
            )
            .catch(err => 
                dispatch({
                    type: GET_POSTS,
                    payload: null
                })
                );

}

export const deletePinned = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .put(`/api/pinned/${id}`)
        .then(res => 
            dispatch({
                type: GET_PINNED,
                payload: res.data
            })
            )
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }

                );

}

//get Post
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
            )
            .catch(err => 
                dispatch({
                    type: GET_POST,
                    payload: null
                })
                );
     
}

//get Post by comment id
export const getPostByComment = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/comment/${id}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
            )
            .catch(err => 
                dispatch({
                    type: GET_POST,
                    payload: null
                })
                );
     
}

export const editPost = (id, postText, history) => dispatch => {
    dispatch(setPostLoading());
    axios
        .put(`/api/posts/${id}`, postText)
        .then(res => history.push('/post/'+id))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }

                );

} 

//edit comment
export const editComment = (commentId, postId,  commentText, history) => dispatch => {
    dispatch(setPostLoading());
    axios
        .put(`/api/posts/comment/${commentId}`, commentText)
        .then(res => history.push('/post/'+postId))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }

                );

} 

//delete post
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: id
            })
            )
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                );
     
}

//add like
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()) )
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                );
     
}

//Remove like
export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()) )
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
                );
     
}

//add comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res => 
            dispatch({
                type: GET_POST,
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

//delete comment
export const deleteComment = (postId, commentId) => dispatch => {
    console.log('deleting')
    axios
      .delete(`/api/posts/comment/${postId}/${commentId}`)
      .then(res =>
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

//set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

//clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}