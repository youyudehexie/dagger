import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Toggle from 'material-ui/lib/toggle';
import RaisedButton from 'material-ui/lib/raised-button';

import Colors from 'material-ui/lib/styles/colors';
import Theme from '../../theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';



import './Settings.scss';

import TopNav from '../../components/TopNav/TopNav';
import Sidebar from '../../components/Sidebar/Sidebar';

export default class Settings extends Component {

    //childContextTypes() {
  //}

    //muiTheme: React.PropTypes.object,

  
    getChildContext() {
        return {
        muiTheme: ThemeManager.getMuiTheme(Theme),
        };
    }
    
    render() {

    const { id } = this.props.params;
    return (
      <div className="settings">
          <TopNav />
          <div className="main">
            <Sidebar projectId={id}/>
            <div className="settings__menu">
                <div className="settings__header">
                通用配置
                </div>
                <div className="settings__group">
                    <TextField floatingLabelText="标题" fullWidth={true} />
                    <TextField floatingLabelText="作者" fullWidth={true}/>
                    <TextField floatingLabelText="主题" fullWidth={true} disabled={true} defaultValue="landscape"/>
                </div>

                <div className="settings__header">
                高亮配置
                </div>
                <div className="settings__group">
                    <Toggle
                    style={{marginTop: 16}}
                    label="是否打开代码高亮"
                    />

                </div>
            </div>
          </div>
      </div>
    );
  }
} 

Settings.childContextTypes = {
    muiTheme: React.PropTypes.object,
}

