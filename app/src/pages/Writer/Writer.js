import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';

import './Writer.scss';

export default class Writer extends Component {

  render() {

    const titleStyle = {
    };

    const inputStyle = {
        fontSize: 34,
    }

    const editorStyle = {
        fontSize: 14,
    }

    return (
      <div className="wt">
        <div className="wt__main">
            <TextField
            className="wt__title"
            defaultValue="Webpack构建之法"
            underlineShow={false}
            inputStyle={inputStyle}
            fullWidth={true}
            hintText="Hint Text"
            />
          <div className="wt__function"></div>
          <div className="wt__editor">
            <TextField
            defaultValue="## 什么是loader
在我的理解`webpack`的 `loarder`相当于一个中间件，`require('file!./test.coffee')` 在执行`require`前，先执行file-loader，中间件可以被设定为一些过滤器，编译器等。现实的场景中，经常都被设定为文件编译器，将coffee文件编译成js文件。图片链接转换成cdn路径，过小的图片转换成base64格式。"
            underlineShow={false}
            inputStyle={editorStyle}
            multiLine={true}
            rowsMax={10}
            type='textarea'
            fullWidth={true}
            hintText="Hint Text"
            />
          </div>
        </div>
        <div className="wt__review">
        </div>
      </div>
    );
  }
} 

