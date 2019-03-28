'use strict';

var webpack = require('webpack');
var path = require('path');
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/dev.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'assets/[name].jsx',
    publicPath: '/assets/'
  },

  module: {
    rules: [{
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_module/,
        query: {
          presets: ['babel-preset-env']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css-loader!less-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: "file-loader"
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {
        test: /\.exec.js$/,
        use: ['script-loader']
      }
    ]
  },
  externals: {
    jquery: 'jQuery',
    slick: 'slick-carousel'
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyWebpackPlugin([
      { from: './src/images/', to: 'images' },
      { from: './src/assets/*.css', to: 'assets' },
      { from: './src/assets/settings.css.twig', to: 'assets' }
    ], {
      ignore: [
        // Doesn't copy any files with a extension
        '*.less',
        './src/assets/*.less',
        '.DS_Store',
        'base/*',
        'pages/*',
        'components/*.less',
        'vendor/',
        'vendor/*'
      ]
    }, { copyUnmodified: true }),
    new webpack.ProvidePlugin({
      'utils': 'utils'
    }),
    new ExtractTextPlugin('assets/styles.css'),
    new WebpackShellPlugin({
      onBuildExit: ['node convert-twig-params.js --env=true']
    })
  ]
}
