import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

import * as storage from 'redux-storage'
import configureStore from './store/configureStore'

import createEngine from 'redux-storage/engines/localStorage';
const engine = createEngine('dagger');

import './styles/base.scss';
let jsonState = JSON.parse(window.localStorage.getItem('dagger'));
delete jsonState.routing;
window.localStorage.setItem('dagger', JSON.stringify(jsonState));


const load = storage.createLoader(engine);

const store = configureStore()
load(store);

render(
  <Root store={store} />,
  document.getElementById('root')
)
