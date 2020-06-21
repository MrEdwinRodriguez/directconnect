import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES, DELETE_HIRE, DELETE_BUSINESS, GET_PROFILES_CRITERIA } from '../actions/types'

const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case GET_PROFILES_CRITERIA:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        case DELETE_HIRE:
        return {
            ...state,
            profile: action.payload,
            loading: false
        };
        case DELETE_BUSINESS:
        return {
            ...state,
            profile: action.payload,
            loading: false
        };
        default:
            return state;
    }
}