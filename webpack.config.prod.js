// webpack.config.prod.js
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['whatwg-fetch', './client_src/index'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath : '/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './client_src/index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
    test: /\.js$/,
    loaders: ['babel-loader'],
    include: [
        path.join(__dirname, 'client_src'),
        path.join(__dirname, 'chessHandler')
      ]
  }]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'client_src/components/'),
      containers: path.resolve(__dirname, 'client_src/containers/'),
      state: path.resolve(__dirname, 'client_src/state'),
      socketHandler: path.resolve(__dirname, 'client_src/socketHandler'),
      chessHandler: path.resolve(__dirname, 'chessHandler'),
      'chess.js': path.resolve(__dirname, 'chesslib')
    }
  }
};