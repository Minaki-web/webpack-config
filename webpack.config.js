const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { glob } = require('glob')

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const htmlFiles = glob.sync('pages/*.html', {
  cwd: './src',
  ignore: 'pages/index.html'
})

const buildConfig = {
  mode: mode,
  devtool: 'source-map',
  target: ['web', 'es5'],

  entry: {
    main: './src/js/main.js',
    about: './src/js/about.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },

  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist')
      }
    ],
    compress: true,
    // hot: true,
    port: 9000,
    watchFiles: ['src/**/*.php', 'src/**/*.html']
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
                plugins: [['postcss-sort-media-queries', { sort: 'desktop-first' }]]
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
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['main'],
      template: './src/pages/index.html'
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: 'src/images', to: 'images' }]
    })
  ],

  resolve: {
    extensions: ['.ts', '.js']
  },

  optimization: {
    chunkIds: 'named',
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    }
  }
}

htmlFiles.forEach((file) => {
  buildConfig.plugins.push(
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: `${file.split('/')[1].split('.')[0]}/index.html`,
      chunks: [file.split('/')[1].split('.')[0]],
      template: `./src/${file}`
    })
  )
})

module.exports = buildConfig
