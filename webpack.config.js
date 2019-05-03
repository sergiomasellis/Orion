const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: {
    main: './app/js/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new BrowserSyncPlugin({
      logPrefix: 'Orion Engine',
      open: false,
      timestamps: false,
      server: { baseDir: ['dist'] }
    }),
    new CopyWebpackPlugin([
    {
      from: 'app/js/models/*',
      to: 'js/models',
      flatten: true
    },
    {
      from: 'app/js/shaders/*',
      to: 'js/shaders',
      flatten: true
    },
    {
      from: 'app/img/*',
      to: 'img',
      flatten: true
    }
  ]),
    new HtmlWebpackPlugin()
  ],
  resolve: {
      modules: [
          'node_modules',
      ],
      extensions: ['.json', '.js'],
      enforceExtension: false,
      alias: {
      }
  },
  resolveLoader: {
      moduleExtensions: ['-loader'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
          {
            loader: 'sass-loader'
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
};