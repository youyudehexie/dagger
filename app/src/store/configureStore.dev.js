import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import DevTools from '../containers/DevTools'
import thunk from 'redux-thunk'
//import api from '../middleware/api'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'


import * as storage from 'redux-storage'
import createEngine from 'redux-storage/engines/localStorage';
const engine = createEngine('dagger');
const reduxRouterMiddleware = syncHistory(browserHistory)

export default function configureStore(initialState) {
  const middleware = storage.createMiddleware(engine);
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      //applyMiddleware(thunk, api, reduxRouterMiddleware, createLogger()),
      applyMiddleware(thunk, reduxRouterMiddleware, middleware, createLogger()),
      DevTools.instrument()
    )
  )
  
  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store)
  
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
