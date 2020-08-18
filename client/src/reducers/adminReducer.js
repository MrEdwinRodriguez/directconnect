import isEmpty from "../validation/is-empty";
import { ADMIN_GET_CHAPTERS, ADMIN_GET_CHAPTER } from "../actions/types";


const initialState = {
    chapters: [],
    chapter: {},
    users: [],
    user: {},
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADMIN_GET_CHAPTERS:
            return {
                ...state,
                chapters: action.payload
            }
        case ADMIN_GET_CHAPTER:
            return {
                ...state,
                chapter: action.payload
            }
        // case UPDATE_USER:
        //     return {
        //         ...state,
        //         isAuthenticated: !isEmpty(action.payload),
        //         user: action.payload,
        //     }
        // case UPDATE_PASSWORD:
        //     return {
        //         ...state,
        //         isAuthenticated: !isEmpty(action.payload),
        //         user: action.payload.user,
        //         updated: action.payload.updated,
        //     }
        default:
            return state;
    }
}