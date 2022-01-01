const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode: mode,
  devtool: 'source-map',

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
          MiniCssExtractPlugin.loader,
          'css-loader',
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
  plugins: [new MiniCssExtractPlugin()]
}
