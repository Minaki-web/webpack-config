const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode: mode,
  devtool: 'source-map',

  entry: {
    main: './src/js/index.js',
    about: './src/js/about.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    hot: true,
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' }
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-sort-media-queries', { sort: 'desktop-first' }]
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['main'],
      template: './src/pages/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'about/index.html',
      chunks: ['about'],
      template: './src/pages/about.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/images', to: 'images' }]
    })
  ],

  resolve: {
    extensions: ['.ts', '.js']
  }
}
