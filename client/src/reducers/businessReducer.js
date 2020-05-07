import { PROFILE_LOADING, GET_BUSINESS } from '../actions/types'

const initialState = {
    business: null,
    businesses: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_BUSINESS:
            return {
                ...state,
                business: action.payload,
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