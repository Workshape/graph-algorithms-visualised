var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nib = require('nib');

var isDev = (process.env.NODE_ENV !== 'production');
var appEntry = './client/main';

var defineEnvPlugin = new webpack.DefinePlugin({
  __DEV__: isDev
});

var entryScripts = [ appEntry ];
var output = {
  path: path.join(__dirname, [ '/', 'build' ].join('')),
  filename: 'bundle.js'
};

var plugins = [
  defineEnvPlugin,
  new ExtractTextPlugin('style.css'),
  new webpack.NoErrorsPlugin()
];

var moduleLoaders = [
  {
    test: /\.js$/,
    loaders: [ 'babel' ],
    exclude: /node_modules/,
    include: __dirname
  }, {
    test: /\.css?$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    include: __dirname
  }, {
    test: /\.styl?$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader'),
    include: __dirname
  }
];

if (isDev) {
  output.publicPath = 'http://localhost:3001/';
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entryScripts = [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    appEntry
  ];

  moduleLoaders = [
    {
      test: /\.js$/,
      loaders: [ 'react-hot', 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: [ 'style-loader', 'css-loader' ],
      include: __dirname
    }, {
      test: /\.styl?$/,
      loaders: [ 'style-loader', 'css-loader', 'stylus-loader' ],
      include: __dirname
    }
  ];
}

moduleLoaders.push([
  {test: /\.gif$/, loader: 'url-loader?limit=100000&mimetype=image/gif'},
  {test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg'},
  {test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png'},
  {test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
  {test: /favicon\.ico$/, loader: 'file-loader?name=favicon.ico&limit=100000&mimetype=image/x-icon'},
  {test: /\.eot$/, loader: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject'},
  {test: /\.woff$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
  {test: /\.ttf$/, loader: 'url-loader?limit=10000&mimetype=application/x-font-ttf'}
]);

module.exports = {
  devtool: 'eval',
  entry: entryScripts,
  output: output,
  plugins: plugins,
  module: {
    loaders: moduleLoaders
  },
  stylus: {
    use: [ nib() ],
    import: ['~nib/lib/nib/index.styl']
  }
};
