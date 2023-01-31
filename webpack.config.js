const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fetch = require('sync-fetch')

      
 let htmlPlugins = glob.sync('./src/views/*', {nodir:true}).map(templatePath => {
  let res = fetch('https://api.chucknorris.io/jokes/random') 
  return new HtmlWebpackPlugin({
    template: templatePath,
    filename: path.parse(templatePath).name + '.html',
    templateParameters: {
      hello: 'some cool variable',
      joke:res.json().value
    }
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
        use:["simple-nunjucks-loader"]
      },
    ],
  },
  plugins: [
    ...htmlPlugins
    // new HtmlWebpackPlugin({
    //     title: "My app",
    //     template:"./views/index.html",
    //   }),

    
    // new HtmlWebpackPlugin({
    //   title: "My app",
    //   filename:'index.html',
    //   template:"./views/index.html",
    // })
  ]
};