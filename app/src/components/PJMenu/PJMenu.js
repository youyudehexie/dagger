import React, { Component, PropTypes } from 'react';
import './PJMenu.scss';
import * as _ from 'lodash';

import Colors from 'material-ui/lib/styles/colors';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import FileOpen from 'material-ui/lib/svg-icons/file/folder-open'
import WarningAction from 'material-ui/lib/svg-icons/alert/warning'

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import NativeRequire from '../../lib/NativeRequire';

const dialog = NativeRequire('electron').dialog;
let timer;
let dialogOpened = false;

export default class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            drop: false,
            dialog: false,
            creating: false,
            tips: '',
            disabled: false,
            forms: {
                repo: {
                    key: 'repo',
                    fullWidth: true,
                    ref: 'repo',
                    test: /^[0-9a-zA-Z]*$/g,
                    floatingLabelText: '博客域名',
                    hintText: 'youyudehexie.github.io',
                },
                email: {
                    key: 'email',
                    ref: 'email',
                    fullWidth: true,
                    floatingLabelText: 'github账号',
                    hintText: 'hello@gmail.com',
                },
                password: {
                    key: 'password',
                    ref: 'password',
                    fullWidth: true,
                    floatingLabelText: 'github密码',
                    type: 'password',
                },
                path: {
                    key: 'path',
                    fullWidth: true,
                    disabled: true,
                    ref: 'path',
                    floatingLabelText: '目录路径',
                }
            },
            createForms: ['repo', 'email', 'password']
        }
    }

    handleDropMenu = (evt) => {
        event.preventDefault();
        this.setState({drop: !this.state.drop});
    };

    handleOpen = () => {
        this.setState({open: true, drop: false});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = () => {
    };

    handleFileOpen = () => {
        let state = this.state;
        if (!dialogOpened) {
            dialogOpened = true;
            const path = dialog.showOpenDialog({ properties: [ 'openDirectory']});
            state.forms.path.value = path;
            dialogOpened = false;
            this.setState(state);
        }
    };

    handleNewProject = () => {
        let state = this.state;
        let ret = true;
        let fields = {};
        let forms = _.clone(state.createForms);
        forms.concat('path').forEach((form) => {
            let value = fields[form] = this.refs[form].getValue() || '';
            state.forms[form].errorText = '';
            if (!value) {
                state.forms[form].errorText = '此项为必填项.';
                ret = false;
                return;
            }

            let rule = state.forms[form].test;
            if (rule) {
                rule = new RegExp(rule);
                if (!rule.test(value)) {
                    state.forms[form].errorText = '请使用数字或英文组合.';
                    ret = false;
                    return;
                }
            }
        });

        this.setState(state);

        if (!ret) return;

        state.creating = true;
        this.setState(state);

        this.props.onCreateCheck(fields)
        .then(() => {
            this.setState({creating: false, tips: '', open: false});
        })
        .then(() => {
            return this.props.onNewProject(fields);
        })
        .catch((e) => {
            this.setState({tips: e.msg || '账号或密码错误', creating: false});
        })
    };

    render() {
        const actions = [
        <FlatButton
            label="Cancel"
            secondary={true}
            onClick={this.handleClose}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            disabled={this.state.creating}
            keyboardFocused={true}
            onClick={this.handleNewProject}
        />,
        ];

        return (
        <div className="pj__menu">
            <RaisedButton label="创建" onClick={this.handleDropMenu} primary={true}/>
            <Dialog
                title="基本信息"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                >
                <div className="pj__group">
                    <div className="pj__input">
                        {
                            this.state.createForms.map((form, idx) => {
                                return (
                                <div key={this.state.forms[form].key}>
                                    <TextField {...this.state.forms[form]} />
                                    <br/>
                                </div>
                                )
                            })
                        }

                        <div className="pj__section">
                            <TextField {...this.state.forms['path']} 
                            />
                            <IconButton 
                            style={{position: 'absolute', bottom: 8, right: -56}} 
                            onClick={this.handleFileOpen}
                            >
                                <FileOpen />
                            </IconButton>
                        </div>
                    </div>
                    <div className="pj__icon"></div>
                </div>

                <div className={`pj__tips ${this.state.tips == '' ? 'hidden' : ''}`} >
                    <WarningAction color={Colors.pink400} style={{verticalAlign: 'bottom', marginRight: 8}}/>
                    <span>{this.state.tips}</span>
                </div>

                </Dialog>

            <Menu zDepth={1} className="pj__new" 
                listStyle={{display: this.state.drop ?  'block' : 'none'}}
                style={{position: 'absolute', width: 120, left: 16, top: 38}}>
                <MenuItem primaryText="新建空白博客" onClick={this.handleOpen}/>
                <MenuItem primaryText="读取远端博客" />
                <MenuItem primaryText="读取本地博客" />
            </Menu>
        </div>
        );
    }
} 


