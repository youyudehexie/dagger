import React, { Component, PropTypes } from 'react';
import './PJMenu.scss';
import * as _ from 'lodash';

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import FileOpen from 'material-ui/lib/svg-icons/file/folder-open'
import NativeRequire from '../../lib/NativeRequire';

const dialog = NativeRequire('electron').dialog;


let timer;
export default class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            drop: false,
            dialog: false,
            disabled: false,
            forms: {
                repo: {
                    key: 'repo',
                    ref: 'repo',
                    test: /^[0-9a-zA-Z]*$/g,
                    floatingLabelText: '博客域名',
                    hintText: 'youyudehexie.github.io',
                },
                email: {
                    key: 'email',
                    ref: 'email',
                    floatingLabelText: 'github账号',
                    hintText: 'hello@gmail.com',
                },
                password: {
                    key: 'password',
                    ref: 'password',
                    floatingLabelText: 'github密码',
                    type: 'password',
                },
                path: {
                    key: 'path',
                    ref: 'path',
                    floatingLabelText: '目录路径',
                }
            },
            createForms: ['repo', 'email', 'password']
        }
    }

    handleDropMenu = () => {
        this.setState({drop: !this.state.drop});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = () => {
        clearTimeout(timer);

        timer = setTimeout( () => {
            let fields = {};
            let forms = _.clone(this.state.createForms);
            forms.concat('path').forEach((form) => {
                let value = fields[form] = this.refs[form].getValue() || '';
            });
            timer = null;

            this.props.onCreateCheck(fields)
            .then(() => console.log('done'))
            .catch((e) => console.log(e))
        }, 1000);
    };

    handleFileOpen = () => {
        let state = this.state;
        if (!this.state.dialog) {
            const path = dialog.showOpenDialog({ properties: [ 'openDirectory']});
            state.dialog = true;
            state.forms.path.value = path;
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
                state.forms[form].errorText = 'This field is required.';
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

        state.creating = true;
        this.setState(state);
        if (!ret) return;
        this.props.onNewProject(fields).then(() => this.setState({creating: false}));
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
            disabled={this.state.disabled}
            keyboardFocused={true}
            onClick={this.handleNewProject}
        />,
        ];

        return (
        <div className="pj__menu">
            <RaisedButton label="创建" onClick={this.handleDropMenu}/>
                <Dialog
                title="基本信息"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                >
                {
                    this.state.createForms.map((form, idx) => {
                        return (
                        <div>
                            <TextField {...this.state.forms[form]} onChange={this.handleChange}/>
                            <br/>
                        </div>
                        )
                    })
                }

                <TextField {...this.state.forms['path']} onChange={this.handleChange}/>
                <IconButton onClick={this.handleFileOpen}>
                    <FileOpen />
                </IconButton>
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

