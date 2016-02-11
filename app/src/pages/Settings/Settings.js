import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Toggle from 'material-ui/lib/toggle';

import Colors from 'material-ui/lib/styles/colors';
import Theme from '../../theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

import './Settings.scss';

import TopNav from '../../components/TopNav/TopNav';
import Sidebar from '../../components/Sidebar/Sidebar';
import RaisedButton from 'material-ui/lib/raised-button';
import Snackbar from 'material-ui/lib/snackbar';


import NativeRequire from '../../lib/NativeRequire';
const BrowserWindow = NativeRequire('electron').BrowserWindow;

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme),
        };
    }

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    handleSaveSettings = () => {
        const { project } = this.props;
        let { settings } = this.props.project && this.props.project.resources || {};
        let fields = ['title', 'author', 'theme'];
        for (let i = 0; i < fields.length; i++) {
            settings[fields[i]] = this.refs[fields[i]].getValue();
        }

        settings.highlight.enable = this.refs.highlight.isToggled();
        this.props.projectActions.saveSetting(project, settings)
        .then(() => {
            this.setState({
                open: true,
            });
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

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { id } = this.props.params;
        const pathname = this.props.location.pathname;
        const { settings } = this.props.project && this.props.project.resources || {};
        const { project } = this.props;

        return (
        <div className="settings">
            <TopNav title={project.account.repo}/>
            <div className="main">
                <Sidebar projectId={id} pathname={pathname} onOpenBrowser={this.handleOpenBrowser}/>
                <div className="settings__menu">
                    <div className="settings__header">
                    通用配置
                    </div>
                    <div className="settings__group">
                        <TextField floatingLabelText="标题" ref="title" fullWidth={true} defaultValue={settings.title}/>
                        <TextField floatingLabelText="作者" ref="author" fullWidth={true} defaultValue={settings.author}/>
                        <TextField floatingLabelText="主题" ref="theme" fullWidth={true} disabled={true} defaultValue="landscape"/>
                    </div>

                    <div className="settings__header">
                    高亮配置
                    </div>
                    <div className="settings__group">
                        <Toggle
                        ref="highlight"
                        defaultToggled={settings.highlight.enable}
                        style={{marginTop: 16}}
                        label="是否打开代码高亮"
                        />

                    </div>
                <div className="settings__save_btn">
                    <RaisedButton label="保存配置" primary={true} onClick={this.handleSaveSettings}/>
                </div>
                </div>
            </div>

            <Snackbar
                open={this.state.open}
                bodyStyle={{backgroundColor: '#2196F3'}}
                message="保存成功"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />
        </div>
    );
  }
} 

Settings.childContextTypes = {
    muiTheme: React.PropTypes.object,
}

