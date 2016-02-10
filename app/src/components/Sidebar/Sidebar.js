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
        const { projectId, pathname } = this.props;
        const items = [{
            key: 'workplace',
            to: `/workplace/${projectId}`,
            active: /workplace/.test(pathname),
            icon: <EditIcon color={/workplace/.test(pathname) ? Colors.blue500 : Colors.grey500}/>,
        }, {
            key: 'settings',
            to: `/settings/${projectId}`,
            active: /settings/.test(pathname),
            icon: <SettingsIcon color={/settings/.test(pathname) ? Colors.blue500 : Colors.grey500}/>,
        }
        ]

        return (
        <div className="sidebar">
            <div className="sidebar__items">
            {
                items.map((item) => {
                    return (
                    <div key={item.key}>
                        <Link 
                            to={item.to} 
                            className={`sidebar__item ${item.active ? 'sidebar__item_active': ''}`}>
                            {item.icon}
                        </Link>
                    </div>
                    )
                })
            }
            </div>
        </div>
        );
    }
} 

