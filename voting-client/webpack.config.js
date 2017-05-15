const webpack = require('webpack'); //needed for the hot loading plugin

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080', //client-side library of webpack dev server
    'webpack/hot/only-dev-server', //webpack hot module loader
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    }]
  },
  resolve: {
    extensions: ['*','.js','.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}