const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const applicationConfig = require('./config/admin.js');
const applicationText = require('./locales/admin/' + applicationConfig.language + '.json');
const env = process.env.NODE_ENV;

module.exports = () => {
  var config = {
    entry: {
      app: path.resolve(__dirname, 'src/admin/client/index.js'),
      vendor: [
        'react',
        'react-dom',
        'react-redux',
        'redux-thunk',
        'react-router-dom',
        'react-dropzone',
        'redux',
        'redux-form',
        'redux-form-material-ui',
        'material-ui'
      ]
    },

    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'public'),
      filename: 'admin-assets/js/[name]-[chunkhash].js'
    },

    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src/admin/client'),
        routes: path.resolve(__dirname, 'src/admin/client/routes'),
        modules: path.resolve(__dirname, 'src/admin/client/modules'),
        lib: path.resolve(__dirname, 'src/admin/client/lib')
      }
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }, {
          test: /\.json$/,
          exclude: /node_modules/,
          use: ['json-loader']
        }, {
          test: /\.css$/,
          include: [ path.resolve(__dirname, "public") ],
          use: ExtractTextPlugin.extract({
              use: [
                  {
                      loader: "css-loader",
                      options: {
                          modules: false,
                          importLoaders: true
                      }
                  }
              ]
          })
        }, {
          test: /\.css$/,
          exclude: /node_modules|public/,
          use: ExtractTextPlugin.extract({
              use: [
                  {
                      loader: "css-loader",
                      options: {
                          modules: true,
                          importLoaders: true,
                          localIdentName: "[name]__[local]___[hash:base64:5]"
                      }
                  }
              ]
          })
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({ APPLICATION_CONFIG: JSON.stringify(applicationConfig) }),
      new webpack.DefinePlugin({ APPLICATION_TEXT: JSON.stringify(applicationText) }),
      new ExtractTextPlugin("admin-assets/css/app-[chunkhash].css"),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'admin-assets/js/vendor-[chunkhash].js'
      }),
      new HtmlWebpackPlugin({
        template: 'src/admin/client/index.html',
        language: applicationConfig.language,
        inject: 'body',
        filename: 'admin/index.html'
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      })
    ]
  }

  config.plugins.push(new webpack.BannerPlugin({banner: `Created: ${new Date().toUTCString()}`, raw: false, entryOnly: false}));

  if (env === 'production') {
    config.stats = {
      colors: false,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false
    }
  }

  return config;
}
