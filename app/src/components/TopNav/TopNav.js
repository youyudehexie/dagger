import React, { Component, PropTypes } from 'react';

import './TopNav.scss';

import NativeRequire from '../../lib/NativeRequire';
const remote = NativeRequire('remote');
const win = remote.getCurrentWindow();

export default class TopNav extends Component {
    constructor(props) {
        super(props);
    }

    handleClose = () => {
        win.close();
    };

    handleMinimize = () => {
        win.minimize();
    };

    handleMaximize = () => {
        win.maximize();
    };

    render() {
        const { title } = this.props;

        return (
        <div className="topnav">
            <div className="topnav__items">
                <div className="topnav__item topnav__close" onClick={this.handleClose}></div>
                <div className="topnav__item topnav__min" onClick={this.handleMinimize}></div>
                <div className="topnav__item topnav__max" onClick={this.handleMaximize}></div>
            </div>
            <div className="topnav__title">{title || 'Dagger'}</div>
        </div>
        );
    }
} 

