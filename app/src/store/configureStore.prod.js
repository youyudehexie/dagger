import { createStore, applyMiddleware } from 'redux'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

import * as storage from 'redux-storage'
import createEngine from 'redux-storage/engines/localStorage';
const engine = createEngine('dagger');

export default function configureStore(initialState) {

  const middleware = storage.createMiddleware(engine);
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, syncHistory(browserHistory), middleware)
  )
}
