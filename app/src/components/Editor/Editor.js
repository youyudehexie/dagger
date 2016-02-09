import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';


import './Editor.scss';

export default class Editor extends Component {

  render() {

    return (
      <div className="editor">
        <input type="text" className="editor__title" defaultValue='I am title.'/>
        <div className="editor__toolbar">
            <RaisedButton 
              className="editor__publish_btn" 
              label="发布" primary={true} 
            />
        </div>
        <div className="editor__box" >
        </div>
      </div>
    );
  }
} 

