import React, { Component, PropTypes } from 'react';

export default class App extends Component {

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
} 

