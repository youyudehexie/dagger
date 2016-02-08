var webpack = require('webpack');

var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'eval',
  entry: [
    path.resolve(ROOT_PATH, 'app/src/index'),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loaders: process.env.NODE_ENV === 'production' ? [] : [],
        include: path.resolve(ROOT_PATH, 'app')
      }
    ],
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel-loader']
    },
    {
      test: /\.scss$/,   
      loader: 'style-loader!css!sass-loader?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib'),
    },
    { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
    { test: /\.ttf$/,    loader: "file-loader" },
    { test: /\.svg$/,    loader: "file-loader" },
    { test: /\.eot$/,    loader: "file-loader" },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? path.resolve(ROOT_PATH, 'api/public') : path.resolve(ROOT_PATH, 'app/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'app/dist'),
    proxy: {
      '/api/*': 'http://localhost:60150'
    },
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      template: './app/src/index.html'
    })
  ]
};

