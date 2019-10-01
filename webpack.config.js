const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const folderPath = "./IntermediatePageFirstCardHtml";

module.exports = {
  entry: folderPath + "/app/App.js",
  output: {
    path: path.resolve(__dirname, folderPath + "/public"),
    filename: "js/bundle.js"
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, folderPath)
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              extract: true,
              spriteFilename: "images/icons-sprite.svg",
              publicPath: "images/svg-icons/"
            }
          },
          {
            loader: "svgo-loader"
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new SpriteLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      template: folderPath + "/app/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
};
