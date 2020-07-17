import { ADD_POST, GET_POSTS, DELETE_POST, POST_LOADING, GET_POST, GET_PINNED } from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    pinned: [],
    loading: false
}

export default function(state = initialState, action) {
  console.log('line', state)
  switch(action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case GET_PINNED:
      return {
        // ...state,
        post: {},
        posts: state.posts,
        pinned: action.payload.pinned,
        loading: false
      };
      default:
        return state;

  }
}