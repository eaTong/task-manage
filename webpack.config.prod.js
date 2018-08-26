const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoPrefixer = require('autoprefixer');
const buildPath = path.resolve(__dirname, 'dist');
const webContextRoot = '/';// 应用的实际访问路径，默认是'/'   可以试试/static/
const AppCachePlugin = require('appcache-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mainColor = '#2f54eb';

function resolve(dir) {
  return path.join(__dirname,  dir)
}

module.exports = {
  mode: 'production',
  entry: './front/index.js',

  output: {
    path: buildPath,
    filename: '[name]-[hash].js',
    publicPath: webContextRoot
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': resolve('front'),
      'shared': resolve('shared')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true || {/* CSSNano Options */}
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoPrefixer]
            }
          }]
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true || {/* CSSNano Options */}
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoPrefixer]
            }
          }, {
            loader: 'less-loader',
            options: {
              modifyVars: {"primary-color": mainColor},
              javascriptEnabled: true
            }
          }
        ]
      }, {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: '[name]_[hash:8].[ext]'
          }
        }

      }, {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            mimetype: 'application/font-woff',
            name: '[name]_[hash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-ca|zh-cn/),
    new AppCachePlugin({
      exclude: ["index.html"],
      output: '/manifest.appcache'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index-production.html'),
      path: buildPath,
      excludeChunks: ['base'],
      filename: 'index.html',
      time: Date.now(),
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      },
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          // process.env.NODE_ENV==="production"
          // 应用代码里，可凭此判断是否运行在生产环境
          NODE_ENV: JSON.stringify('production')
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
      chunkFilename: "[id].css"
    })
  ]
};
