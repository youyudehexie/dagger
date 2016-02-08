
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import DevTools from './DevTools'
import { Router, browserHistory } from 'react-router'

export default class Root extends Component {
  render() {
    const { store } = this.props


          //<DevTools />
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} routes={routes} />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
