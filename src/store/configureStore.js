import { createStore, applyMiddleware } from 'redux'
import { createHashHistory } from 'history';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import electron from 'electron';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const logger = createLogger()

export const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger)
  );
  
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  
  return store;
}

export const loadState = () => {
  try {
    const serializeState = localStorage.getItem('state');
    if (serializeState === null) {
      return undefined;
    }
    return JSON.parse(serializeState);
  } catch(err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
  } catch(err) {
    // Ignore write errors
  }
}

// Start history
export const history = createHashHistory({
  // Here we override prompt to use the native electron dialog module, this lets us override the message box title
  getUserConfirmation: (message, callback) => {
    electron.remote.dialog.showMessageBox(
      {
        title: 'Confirm Navigation',
        type: 'question',
        buttons: ['Yes', 'No'],
        message
      },
      (clickedIdx) => {
        if ( clickedIdx === 0 ) {
          callback( true );
        } else {
          callback( false );
        }
      }
    )
  }
  //callback(window.confirm(message))
});

// Merge middlewares
export const middlewares = [
  routerMiddleware(history)
];

export const store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(...middlewares)
);
