import React, { Component, PropTypes } from 'react';

import * as COLOR from '../../constants/color';

import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import IconButton from 'material-ui/lib/icon-button';
import Search from 'material-ui/lib/svg-icons/action/search';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';

import BuildIcon from 'material-ui/lib/svg-icons/action/build';
import SettingApplication from 'material-ui/lib/svg-icons/action/settings-applications';

import './Workplace.scss';

export default class Workplace extends Component {

  render() {

    const style = {
        color: COLOR.PRIMARY_TEXT,
        backgroundColor: 'white',
    };

    const testStyle = {
        fontWeight: 900,
        paddingLeft: 24,
        fontSize: 34,
        fontFamily: "'Roboto', 'Noto',sans-serif",
        color: COLOR.TEXT_PRIMARY
    }

    const inputStyle = {
        fontFamily: "'Roboto', 'Noto',sans-serif",
        fontSize: 14,
    }

    return (
        <div className="wp">

          <div className="sidebar">
            <div className="sidebar__lt">
              <div className="sidebar__session active">
                  <ActionHome color={Colors.blue400} style={{width: 56, height: 36}}/>
              </div>
              <div className="sidebar__session">
                  <SettingApplication color={Colors.blue50} style={{width: 56, height: 36}}/>
              </div>
            </div>
          </div>

            <div className="timeline">
            <AppBar
                    style={style}
                    className="timeline__nav"
                    iconElementLeft={<IconButton><Search color={Colors.grey900}/></IconButton>}
                /> 
            <div className="pt__list">
                <Card>
                    <CardHeader
                        title="Without Avatar"
                        subtitle="Subtitle"
                        />
                        <CardText >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>

                    <Divider />
                        
                    <CardHeader
                        title="Without Avatar"
                        subtitle="Subtitle"
                        />
                        <CardText >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>

                    <Divider />
                    <CardHeader
                        title="Without Avatar"
                        subtitle="Subtitle"
                        />
                        <CardText >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>
                </Card>
            </div>
            </div>
            <div className="ct">
                <div className="ct__title">
                    <TextField
                    defaultValue="Webpack构建之法，Loader"
                    fullWidth={true}
                    underlineShow={false}
                    inputStyle={testStyle}
                    />
                </div>
                <div className="ct__wrap">
                    <TextField
                    className="ct__editor"
                    type="textarea"
                    rows={10}
                    rowsMax={10}
                    inputStyle={inputStyle}
                    defaultValue="## 什么是loader
    在我的理解`webpack`的 `loarder`相当于一个中间件，`require('file!./test.coffee')` 在执行`require`前，先执行file-loader，中间件可以被设定为一些过滤器，编译器等。现实的场景中，经常都被设定为文件编译器，将coffee文件编译成js文件。图片链接转换成cdn路径，过小的图片转换成base64格式。"
                    fullWidth={true}
                    multiLine={true}
                    />
                </div>
            </div>
        </div>
    );
  }
} 

