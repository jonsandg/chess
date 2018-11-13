var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'server', 'public'),
    filename: 'bundle.js',
    publicPath : '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
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
    }
  ]},
  devServer: {
    contentBase: './public',
    hot: true,
    proxy: [ 
    {
      context: ['/api', '/account', '/socket.io'],
      target: 'http://localhost:3000',
      secure: false
    }]
    
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'client/components/'),
      containers: path.resolve(__dirname, 'client/containers/'),
      state: path.resolve(__dirname, 'client/state'),
      socketHandler: path.resolve(__dirname, 'client/socketHandler'),
      chessHandler: path.resolve(__dirname, 'chessHandler/'),
      'chess.js': path.resolve(__dirname, 'chess.min.js')
    }
  }
};

