import { PROFILE_LOADING, GET_EXPERIENCE } from '../actions/types'

const initialState = {
    experience: null,
    experiences: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_EXPERIENCE:
            return {
                ...state,
                experience: action.payload,
                loading: false
            }
        // case GET_PROFILES:
        //     return {
        //         ...state,
        //         profiles: action.payload,
        //         loading: false
        //     }
        // case CLEAR_CURRENT_PROFILE:
        //     return {
        //         ...state,
        //         profile: null
        //     }
        default:
            return state;
    }
}