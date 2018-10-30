const path = require('path')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: {
    vendor: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: miniCssExtractPlugin.loader, options: {} },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
}
