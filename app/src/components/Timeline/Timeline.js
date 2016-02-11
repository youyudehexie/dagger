import React, { Component, PropTypes } from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import NoteAdd from 'material-ui/lib/svg-icons/action/note-add';
import Dialog from 'material-ui/lib/dialog';
import CircularProgress from 'material-ui/lib/circular-progress';
import TextField from 'material-ui/lib/text-field';

import './Timeline.scss';
import * as COLOR from '../../constants/color.js'


export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            open: false,
            active: undefined,
        }
    }

    handleClick = (post) => {
        this.props.onReadPost(post);
        this.setState({active: post._id});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleNewPost = () => {
        const title = this.refs.title.getValue();
        this.setState({creating: true});
        this.props.onNewPost(title)
        .then(() => {
            this.setState({open: false, creating: false});
        });
    };

    render() {
        const { posts } = this.props;
        const active = this.state.active || posts[0];

        let actions;
        let dialogTitle;
        let dialogStyl;
        let bodyEl;

        if (this.state.creating) {
            actions = [];
            dialogTitle = '创建中';
            bodyEl = (<CircularProgress />)
            dialogStyl = {textAlign: 'center', maxWidth: 320};
        } else {
            dialogTitle = '请输入标题';
            dialogStyl = {textAlign: 'center', maxWidth: 320};
            bodyEl = (<TextField ref="title" 
                fullWidth={true}
                ref="title"
                hintText="标题"
            />);

            actions = [
                <FlatButton
                    label="Cancel"
                    secondary={true}
                    onClick={this.handleClose}
                />,

                <FlatButton
                    label="Submit"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.handleNewPost}
                />,
            ];
        }

        return (
        <div className="timeline">
            <div className="te__new">
                <FlatButton
                onClick={this.handleOpen}
                style={{width: '100%', color: COLOR.DEFAULT_PRIMARY}}
                label="新建文章"
                secondary={true}
                labelPosition="after"
                icon={<NoteAdd />}
            />
            </div>

            <Dialog
                title={dialogTitle}
                actions={actions}
                modal={false}
                contentStyle={dialogStyl}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                {bodyEl}
            </Dialog>

            {
                posts.map((post, idx) => {
                    return (
                        <div
                            onClick={this.handleClick.bind(this, post)} 
                            className="te__item"
                            style={active == post._id ? {backgroundColor: COLOR.LIGHT_PRIMARY} : {}}
                            key={post._id} 
                        >
                            <div className="te__title">{post.title}</div>
                            <div className="te__subtitle">{post.date}</div>
                        </div>
                    )
                })
            }

            </div>
        );
    }
} 

