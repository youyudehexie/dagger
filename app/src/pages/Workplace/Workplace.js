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

import TopNav from '../../components/TopNav/TopNav';
import Sidebar from '../../components/Sidebar/Sidebar';
import Timeline from '../../components/Timeline/Timeline';

import './Workplace.scss';
import Editor from '../../components/Editor/Editor';

export default class Workplace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: undefined,
        }
    }

   componentWillMount(){
       const { project } = this.props;
       this.props.projectActions.loadProject(project);
   }

    componentWillReceiveProps(nextProps) {
        if (this.props.project && this.props.project.id != nextProps.project.id) {
            this.props.projectActions.loadProject(nextProps.project);
        }
    }

    handleNewPost = () => {
        console.log('handleNewpost');
    };

    handleEditPost = (post, content) => {
        const { project } = this.props;
        return this.props.projectActions.editPost(project, post, content);
    };

    render() {
        const { id } = this.props.params;
        const pathname = this.props.location.pathname;
        const { posts, project } = this.props;
        let post = this.state.post || posts[0] || {};
        post.rawPost = project.resources.rawPost && project.resources.rawPost[post.source] || '';

        return (
            <div className="wp">
            <TopNav />
            <div className="main">
                <Sidebar projectId={id} pathname={pathname}/>
                <Timeline posts={posts} onNewPost={this.handleNewPost} />
                <Editor post={post} onEditPost={this.handleEditPost}/>
            </div>
            </div>
        );
    }
} 

