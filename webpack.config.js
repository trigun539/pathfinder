const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const join = path.join;
const webpack = require('webpack');

// HTML
const htmlConfig = new HtmlWebpackPlugin({
  title: 'Pathfinder',
  template: './index.html'
});

module.exports = {
  mode: 'development',
  context: join(__dirname, 'src'),
  entry: join(__dirname, '/src/main.js'),
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['node_modules', './src']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: join(__dirname, 'node_modules')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    htmlConfig
  ],
  devServer: {
    contentBase: join(__dirname, 'dist'),
    port: 9000,
    stats: 'errors-only'
  }
};
