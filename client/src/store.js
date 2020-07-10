import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; 

const middleware = applyMiddleware(thunk);

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    reduxDevTools(
        middleware
    )
);

export default store;