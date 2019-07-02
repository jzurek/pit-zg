import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import messageReducer from './reducers/message';

const reducer = combineReducers({
  messageReducer,
});

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

export default store;
