import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';

import TopNav from '../../components/TopNav/TopNav';
import PJMenu from '../../components/PJMenu/PJMenu';
import ListProgress from '../../components/ListProgess/ListProgress';
import Project from '../../lib/Project';

import './Home.scss';


import NativeRequire from '../../lib/NativeRequire';
const remote = NativeRequire('remote');
const BrowserWindow = remote.BrowserWindow;


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleNewProject = (project) => {
        let {email, password, path } = project;
        return this.props.projectActions.createProject(email, password, path);
    };

    handleCreateCheck = (project) => {
        let {email, password, path } = project;
        return this.props.projectActions.checkCreateEnv(email, password, path);
    };

    handleClick = (id) => {
        var win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            title: 'Dagger',
        });

        const HOST = process.env.NODE_ENV === 'production' ? 'app://www.dagger.com' : 'http://127.0.0.1:9090'
        console.log(`${HOST}/workplace/${id}`)

        win.loadURL(`${HOST}/workplace/${id}`);
        //win.loadURL(`http://127.0.0.1:9090/workplace/${id}`);
    };

    render() {
        const { Projects } = this.props;

        return (
        <div className="home">
            <TopNav />
            <PJMenu onNewProject={this.handleNewProject} onCreateCheck={this.handleCreateCheck}/>
            <div className="home__pj">
                <List insetSubheader={true}>
                {
                    Projects.map((project) => {
                        return (
                        <div className="pj__item" key={project.id}>
                            <ListProgress
                                progressCls="pj__progress"
                                max={project.flow.max}
                                value={project.flow.value}
                            />

                            <ListItem
                                onClick={this.handleClick.bind(this, project.id)}
                                leftAvatar={<Avatar icon={<FileFolder />} />}
                                primaryText={project.account.repo}
                            />
                        </div>
                        )
                    })
                }
                </List>
            </div>
        </div>
        );
  }
}

