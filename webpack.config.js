const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'app/js');
const APP_DIR = path.resolve(__dirname, 'js');

var config = {
  debug: true,
  devtool: 'cheap-module-source-map',
  entry: BUILD_DIR + '/app.js',
  module: {
  	loaders: [
  		{
  			test : /\.jsx?/,
        include : BUILD_DIR,
        loader : 'babel'
  		}
  	]
  },
  output: {
    path: APP_DIR,
    filename: 'app.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
};

module.exports = config;