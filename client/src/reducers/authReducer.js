import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, GET_USER, UPDATE_USER } from "../actions/types";


const initialState = {
    isAuthenticated: false,
    user: {},
    profile: {},
    success: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case GET_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                success: true
            }

        default:
            return state;
    }
}