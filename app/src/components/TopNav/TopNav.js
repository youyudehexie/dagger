import React, { Component, PropTypes } from 'react';

import './TopNav.scss';

import NativeRequire from '../../lib/NativeRequire';
const electron = NativeRequire('electron');
const win = electron.getCurrentWindow();

export default class TopNav extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    handleClose = () => {
        console.log('close');
        //win.hide();
    };

    handleMinimize = () => {
        win.minimize();
    };

    handleMaximize = () => {
        win.maximize();
    };

    render() {
        return (
        <div className="topnav">
            <div className="topnav__items">
            <div className="topnav__item topnav__close" onClick={this.handleClose}></div>
            <div className="topnav__item topnav__min" onClick={this.handleMinimize}></div>
            <div className="topnav__item topnav__max" onClick={this.handleMaximize}></div>
            </div>
            <div className="topnav__title">Dagger</div>
        </div>
        );
    }
} 

