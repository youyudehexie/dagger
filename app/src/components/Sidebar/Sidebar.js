import React, { Component, PropTypes } from 'react';
import { Link, History } from 'react-router'

import EditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings';

import './Sidebar.scss';
import Colors from 'material-ui/lib/styles/colors';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { projectId } = this.props;

        return (
        <div className="sidebar">
            <div className="sidebar__items">
                <Link to={`/workplace/${projectId}`} className="sidebar__item sidebar__item_active">
                    <EditIcon color={Colors.blue500}/>
                </Link>
                <Link to={`/settings/${projectId}`} className="sidebar__item" >
                    <SettingsIcon color={Colors.grey500}/>
                </Link>
            </div>
        </div>
        );
    }
} 

