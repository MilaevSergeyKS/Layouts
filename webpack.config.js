const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const folderPath = "./CryptonLayout1";

module.exports = {
    entry: folderPath + "/app/App.js",
    output: {
        path: path.resolve(__dirname, folderPath + "/public"),
        filename: "js/bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, folderPath),
        port: 8081,
        // host: '192.168.1.140'
        // host: '192.168.1.140' - параметр для доступа по локальной сети
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
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    "css-loader",
                    "postcss-loader",
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
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
                test: /\.(ico)$/i,
                use: [

                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images/"
                        }
                    },
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
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        interpolate: true
                    }
                }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new SpriteLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
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
