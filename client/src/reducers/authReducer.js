import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, GET_USER, UPDATE_USER, UPDATE_PASSWORD } from "../actions/types";


const initialState = {
    isAuthenticated: false,
    user: {},
    profile: {},
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
            }
        case UPDATE_PASSWORD:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload.user,
                updated: action.payload.updated,
            }
        default:
            return state;
    }
}