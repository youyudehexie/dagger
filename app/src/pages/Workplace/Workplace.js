import React, { Component, PropTypes } from 'react';

import * as COLOR from '../../constants/color';

import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import IconButton from 'material-ui/lib/icon-button';
import Search from 'material-ui/lib/svg-icons/action/search';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';

import BuildIcon from 'material-ui/lib/svg-icons/action/build';
import SettingApplication from 'material-ui/lib/svg-icons/action/settings-applications';
import Snackbar from 'material-ui/lib/snackbar';


import TopNav from '../../components/TopNav/TopNav';
import Sidebar from '../../components/Sidebar/Sidebar';
import Timeline from '../../components/Timeline/Timeline';

import './Workplace.scss';
import Editor from '../../components/Editor/Editor';

import NativeRequire from '../../lib/NativeRequire';
const remote = NativeRequire('remote');
const BrowserWindow = remote.BrowserWindow;


export default class Workplace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            post: undefined,
        }
    }

   componentWillMount() {
       const { project } = this.props;
       this.props.projectActions.loadProject(project);
   }

    componentWillReceiveProps(nextProps) {
        if (this.props.project && this.props.project.id != nextProps.project.id) {
            this.props.projectActions.loadProject(nextProps.project);
        }
    }

    handleNewPost = (title) => {
        const { project } = this.props;
        return this.props.projectActions.newPost(project, title);
    };

    handleEditPost = (post, contentText, contentHtml) => {
        const { project } = this.props;
        return this.props.projectActions.editPost(project, post, contentText, contentHtml);
    };

    handlePublish = () => {
        const { project } = this.props;
        return this.props.projectActions.deployPost(project)
        .then(() => this.setState({open: true}))
        .catch(() => {
            this.setState({open: true})
        })
    };

    handleReadPost = (post) => {
        this.setState({post: post})
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleOpenBrowser = () => {
        const { project } = this.props;

        var win = new BrowserWindow({ 
            width: 800, 
            height: 600,
        });

        win.loadURL(`http://${project.account.repo}?time=${Date.now()}`);
    };

    render() {
        const { id } = this.props.params;
        const pathname = this.props.location.pathname;
        const { posts, project } = this.props;
        let post = this.state.post || posts[0] || {};
        post.rawPost = project.resources.rawPost && project.resources.rawPost[post.source] || '';

        return (
        <div className="wp">
            <TopNav title={project.account.repo}/>
            <div className="main">
                <Sidebar projectId={id} pathname={pathname} onOpenBrowser={this.handleOpenBrowser}/>
                <Timeline 
                    posts={posts} 
                    onReadPost={this.handleReadPost}
                    onNewPost={this.handleNewPost} 
                />
                <Editor 
                    post={post} 
                    publish={project.publishing}
                    onEditPost={this.handleEditPost} 
                    onPublish={this.handlePublish}
                />
                <Snackbar
                    open={this.state.open}
                    bodyStyle={{backgroundColor: '#2196F3'}}
                    message="发布成功"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        </div>
        );
    }
} 

