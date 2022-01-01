const path = require('path')

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode: mode,
  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 9000
  }
}
