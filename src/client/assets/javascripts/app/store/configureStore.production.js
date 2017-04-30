import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import requestMiddleware from '../../middlewares/requestMiddleware';

import rootReducer from '../reducer';

const enhancer = compose(
  applyMiddleware(promiseMiddleware, requestMiddleware)
)(createStore);

export default function configureStore(initialState) {
  return enhancer(rootReducer, initialState);
}
