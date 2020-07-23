import { CONTENT_LOADING, GET_BLOGS, GET_BLOG, GET_PODCASTS, GET_PODCAST} from '../actions/types'

const initialState = {
    blogs: null,
    blog: null,
    podcasts: null,
    podcast: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CONTENT_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_BLOGS:
            return {
                ...state,
                blogs: action.payload.blogs,
                loading: false
            }
        case GET_BLOG:
            return {
                ...state,
                blog: action.payload.blog,
                loading: false
            }
        case GET_PODCASTS:
            return {
                ...state,
                podcasts: action.payload.podcasts,
                loading: false
            }
        case GET_PODCAST:
            return {
                ...state,
                podcast: action.payload.podcast,
                loading: false
            }
        default:
            return state;
    }
}