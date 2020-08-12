import { PROFILE_LOADING, GET_ORGINIZATION_EMAIL_INFO} from '../actions/types'

const initialState = {
    orginization: null,
    chapter: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_ORGINIZATION_EMAIL_INFO:
            return {
                ...state,
                chapter: action.payload,
                loading: false
            }
        default:
            return state;
    }
}