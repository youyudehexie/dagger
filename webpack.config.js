var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

var plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': process.env.NODE_ENV === 'production' ? "'production'" : "",
    }),
    new HtmlwebpackPlugin({
      template: './app/src/index.html'
    })
]

if (process.env.NODE_ENV == 'production') {
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin())
}


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
      loaders: process.env.NODE_ENV === 'production' ? ['babel-loader'] : ['react-hot', 'babel-loader']
    },
    {
      test: /\.scss$/,   
      loader: 'style-loader!css!sass-loader?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib'),
    },
    {
        test: /\.(woff|eot|ttf|svg)$/i,
        loader: "file-loader"
    }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? path.resolve(ROOT_PATH, 'dagger/src/web_content') : path.resolve(ROOT_PATH, 'dagger/src/web_content'),
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
  plugins: plugins
};

