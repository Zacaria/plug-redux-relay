import { createStore, applyMiddleware } from 'redux';
import todoApp from '../reducers';
import thunk from 'redux-thunk';

const configureStore = () => {
  //only plain object reach createLogger middleware and then reducers
  const middlewares = [thunk];

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(todoApp, applyMiddleware(...middlewares));
};

export default configureStore;
