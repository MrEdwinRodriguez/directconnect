import { PROFILE_LOADING, GET_HIRE } from '../actions/types'

const initialState = {
    hire: null,
    hires: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_HIRE:
            return {
                ...state,
                hire: action.payload,
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