const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';


module.exports = {
    entry: {
        main: './src/pages/index.js',
        about: './src/pages/about.js',
        details: './src/pages/details.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './scripts/[name].[chunkhash].js'
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
                test: /\.css$/i,
                use: [
                    (isDev ? 'style-loader'  : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                            publicPath: '../'
                            }
                        }),
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: {
                loader: 'file-loader?name=./images/[dir]/[name].[ext]'
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader?name=./fonts/[name].[ext]'
                },
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ //
            filename: './styles/[name].[contenthash].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/about.html',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/details.html',
            filename: 'details.html'
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new WebpackMd5Hash(),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    global_defs: {
                        '@alert': 'console.log',
                    },
                    drop_console: true
                }
            }
        })
    ]
};