import { GET_POSITIONS, DELETE_POSISITION, POSITION_LOADING, GET_POSITION, GET_POSITIONS_CRITERIA} from '../actions/types';

const initialState = {
    positions: [],
    position: {},
    loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case POSITION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSITIONS:
      return {
        ...state,
        positions: action.payload,
        loading: false
      };
      case GET_POSITION:
      return {
        ...state,
        position: action.payload,
        loading: false
      };
      case GET_POSITIONS_CRITERIA:
      return {
        ...state,
        positions: action.payload,
        loading: false
      }
    // case GET_POST:
    //   return {
    //     ...state,
    //     post: action.payload,
    //     loading: false
    //   }
    // case DELETE_POST:
    //   return {
    //     ...state,
    //     posts: state.posts.filter(post => post._id !== action.payload)
    //   };
 
      default:
        return state;

  }
}