import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ContentEditable from '../../components/Contenteditable/Contenteditable'
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import PublishIcon from 'material-ui/lib/svg-icons/editor/publish';
import Snackbar from 'material-ui/lib/snackbar';

import RefreshIndicator from 'material-ui/lib/refresh-indicator';

import './Editor.scss';

let timer = null;
let contentText = '';
let contentHtml = '';

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }

    handleChange = (evt) => {
        const { post } = this.props;
        contentText = evt.target.text;
        contentHtml = evt.target.value;

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            const { post } = this.props;
            this.props.onEditPost(post, contentText, contentHtml);
        }, 100);
    };

    handlePublish = () => {
        this.props.onPublish()
    };

    render() {
        const { title, raw, rawPost} = this.props.post;
        let content = rawPost && rawPost.replace(/\n/g, '</br>') || '';

        let flBtn;
        if (this.props.publish) {
            flBtn = (
                <div className="editor__loading">
                    <RefreshIndicator
                        size={40}
                        left={0}
                        top={0}
                        status="loading"
                    />
                </div>
            )
        } else {
            flBtn = (
            <div className="editor__publish">
                <FloatingActionButton 
                    mini={true} 
                    disabled={this.props.publish}
                    onClick={this.handlePublish}
                >
                    <PublishIcon />
                </FloatingActionButton>
            </div>
            )
        }

        return (
        <div className="editor">
            {flBtn}
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

