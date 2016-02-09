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

  render() {

    const { id } = this.props.params;

    return (
        <div className="wp">
          <TopNav />
          <div className="main">
            <Sidebar projectId={id}/>
            <Timeline />
            <Editor />
          </div>
        </div>
    );
  }
} 

