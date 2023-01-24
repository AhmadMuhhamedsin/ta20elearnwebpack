const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

console.log(glob.sync('./src/views/*'))
glob.sync('./src/views/*').map(path =>  {
  return new HtmlWebpackPlugin({
    template: templatePath,
    filename: path.parse(templatePath).name + '.html'
  })
})
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test:/\.css$/i,
        use:["style-loader","css-loader"]
      },
      {
        test:/\.s[ac]css$/i,
        use:["style-loader","css-loader","sass-loader"]
      },
      {
        test:/\.(njk|nunjucks)$/i,
        use:["nunjucks-loader"]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: "My app",
        template:"./views/index.html",
      }),

    
    new HtmlWebpackPlugin({
      title: "My app",
      filename:'index.html',
      template:"./views/index.html",
    })
  ]
};