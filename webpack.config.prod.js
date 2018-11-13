// webpack.config.prod.js
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['whatwg-fetch', './client/index'],
  output: {
    path: path.join(__dirname, 'server', 'public'),
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
      template: './client/index.html'
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
        path.join(__dirname, 'client'),
        path.join(__dirname, 'chessHandler')
      ]
  }]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'client/components/'),
      containers: path.resolve(__dirname, 'client/containers/'),
      state: path.resolve(__dirname, 'client/state'),
      socketHandler: path.resolve(__dirname, 'client/socketHandler'),
      chessHandler: path.resolve(__dirname, 'chessHandler'),
      'chess.js': path.resolve(__dirname, 'chess.min.js')
    }
  }
};