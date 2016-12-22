var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'app/js');
var APP_DIR = path.resolve(__dirname, 'js');

var config = {
  debug: true,
  entry: APP_DIR + '/app.js',
  module: {
  	loaders: [
  		{
  			test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
  		}
  	]
  }
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  }
};

module.exports = config;