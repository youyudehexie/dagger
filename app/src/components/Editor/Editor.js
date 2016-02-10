import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentEditable from 'react-contenteditable'

import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import PublishIcon from 'material-ui/lib/svg-icons/editor/publish';
import Snackbar from 'material-ui/lib/snackbar';


import './Editor.scss';

let timer = null;
let text = '';

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }

  handleChange = (evt) => {

    text = evt.target.value;
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    timer = setTimeout(() => {
        const { post } = this.props;
        this.props.onEditPost(post, text)
    }, 1000);
  };

  render() {
    const { title, raw, rawPost} = this.props.post;
    let content = rawPost && rawPost.replace(/\n/g, '</br>') || '';

    return (
      <div className="editor">
        <div className="editor__publish">
            <FloatingActionButton mini={true} >
                    <PublishIcon />
            </FloatingActionButton>
        </div>

        <ContentEditable
            className="editor__box"
            html={content} // innerHTML of the editable div
            disabled={false}       // use true to disable edition
            onChange={this.handleChange} // handle innerHTML change
            />

      </div>
    );
  }
} 

