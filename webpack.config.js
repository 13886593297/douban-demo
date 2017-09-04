const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/js/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      // 处理css 的loader
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // 处理 图片文件的 loader
      { test: /\.(png|jpg|jpeg|gif|bmp)$/, use: 'url-loader' }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      // 模板页面路径
      template: path.join(__dirname, './src/index.html'),
      // 在内存中生成页面路径
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    // 服务器的根目录 Tell the server where to serve content from
    // https://webpack.js.org/configuration/dev-server/#devserver-contentbase
    contentBase: path.join(__dirname, './'),
    // 自动打开浏览器
    open: true,
    // 端口号
    port: 8188,
    // 解决打开页面出现 /undefined bug
    //openPage: ''
    hot: true // 启用热更新
  },
}