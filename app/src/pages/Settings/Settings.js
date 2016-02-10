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

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { id } = this.props.params;
        const pathname = this.props.location.pathname;
        const { settings } = this.props.project && this.props.project.resources || {};

        return (
        <div className="settings">
            <TopNav />
            <div className="main">
                <Sidebar projectId={id} pathname={pathname}/>
                <div className="settings__menu">
                    <div className="settings__header">
                    通用配置
                    </div>
                    <div className="settings__group">
                        <TextField floatingLabelText="标题" fullWidth={true} defaultValue={settings.title}/>
                        <TextField floatingLabelText="作者" fullWidth={true} defaultValue={settings.author}/>
                        <TextField floatingLabelText="主题" fullWidth={true} disabled={true} defaultValue="landscape"/>
                    </div>

                    <div className="settings__header">
                    高亮配置
                    </div>
                    <div className="settings__group">
                        <Toggle
                        defaultToggled={settings.highlight.enable}
                        style={{marginTop: 16}}
                        label="是否打开代码高亮"
                        />

                    </div>
                <div className="settings__save_btn">
                    <RaisedButton label="保存配置" primary={true} onClick={this.handleClick}/>
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

