process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config');

var host = 'localhost';
var devServerPort = 3001;

new WebpackDevServer(webpack(webpackConfig), {
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  hot: true,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath
}).listen(devServerPort, host, function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack Dev Server running at ' + host + ':' + devServerPort);
});
