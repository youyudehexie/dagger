import React, { Component, PropTypes } from 'react';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import SettingApplication from 'material-ui/lib/svg-icons/action/settings-applications';
import Colors from 'material-ui/lib/styles/colors';


import './App.scss';

export default class App extends Component {

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
} 

