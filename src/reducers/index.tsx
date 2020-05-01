import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import library from './library';

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    library,
  });

export default createRootReducer;
