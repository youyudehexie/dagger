import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import NoteAdd from 'material-ui/lib/svg-icons/action/note-add';
import Dialog from 'material-ui/lib/dialog';

import TextField from 'material-ui/lib/text-field';



import './Timeline.scss';


export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            active: undefined,
        }
    }

    handleClick = (post) => {
        this.setState({active: post._id});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleNewPost = () => {
        console.log(this.refs.title.getValue());
        this.setState({open: false});
    };
    
    componentWillReceiveProps(nextProps) {
        // init
        if (this.props.posts.length == 0 && nextProps.posts.length > 0) {
            this.handleClick(nextProps.posts[0]);
        }
    };

    render() {
        const { posts } = this.props;
        const active = this.state.active || posts[0];

        const actions = [
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

        return (
        <div className="timeline">

            <div className="te__new">
                <FlatButton
                onClick={this.handleOpen}
                style={{width: '100%', color: '#2196F3'}}
                label="新建文章"
                secondary={true}
                labelPosition="after"
                icon={<NoteAdd />}
            />

            </div>

            <Dialog
            title="文章标题"
            actions={actions}
            modal={false}
            contentStyle={{maxWidth: 320}}
            open={this.state.open}
            onRequestClose={this.handleClose}
            >

            <TextField ref="title" 
                fullWidth={true}
                ref="title"
                hintText="标题"
            />

            </Dialog>
            {
                posts.map((post, idx) => {
                    return (
                        <div 
                            onClick={this.handleClick.bind(this, post)} 
                            className="te__item"
                            style={active == post._id ? {backgroundColor: '#BBDEFB'} : {}}
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

