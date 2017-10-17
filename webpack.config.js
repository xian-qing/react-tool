/**
 * Created by wxq on 2017/9/5.
 * 详细配置文件说明
 */
//引入所需npm模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//let CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

console.log("当前运行环境：", isPro ? 'production' : 'development');

pluginsFn = () =>{
    let plugin = [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject:'body',
        }),
        // 分开打包多个css
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css',
            //allChunks: true
        }),
        new optimizeCssAssetsPlugin({
            cssProcessorOptions: {
                safe: true
            }
        })
    ]
    if(isPro){
        plugin.push(
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',  //name是提取公共代码块后js文件的名字。
                chunks: ['vendor'] //只有在vendor中配置的文件才会提取公共代码块至manifest的js文件中
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    warnings: false,
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true
                },
                sourceMap: true
            })
        )
    }else {
        plugin.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new webpack.HotModuleReplacementPlugin()
            //new webpack.NoEmitOnErrorsPlugin()
        )
    }
    return plugin
}

module.exports = {
    entry:{
        //index:["babel-polyfill", "react-hot-loader/patch",path.join(__dirname,'./src/index')]
        index:["babel-polyfill", "react-hot-loader/patch",path.join(__dirname,'./src/index')]
    },
    output:{
        path: path.resolve(__dirname, "dist"), // 打包文件路径
        filename: isPro?'js/[name].[chunkhash:8].js':'js/[name].[hash:8].js',
        chunkFilename: 'js/[name]-[id].[chunkhash:8].bundle.js', // 代码分割
        publicPath:isPro?'/static/':'/',//生成的html里的引用路径用 publicPath
    },
    module: {
        // 关于模块配置
        rules: [
        // 模块规则（配置 loader、解析器等选项）
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,
                include: path.join(__dirname,'src'),
                loader: 'babel-loader',
            },
            {
                test:  /([^/]+)\/?([^/]*)\.jsx?$/,
                include: path.join(__dirname,'src/page/'),
                use: ['bundle-loader?lazy', 'babel-loader'],
                /*use: [
                    {   loader : 'bundle-loader?lazy',
                        options : {
                        name:'image/[name].js'
                        }
                    }
                ],*/

            },
            {
                test: /\.css/,
                include: path.join(__dirname,'src'),
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: process.env.NODE_ENV === 'production',
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname,'src'),
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: process.env.NODE_ENV === 'production',
                                sourceMap: true,
                                modules: false,
                                importLoaders: 2,
                                localIdentName:
                                    '[path][name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: loader => [require('autoprefixer')()],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                include: path.join(__dirname,'src'),
                use: [
                    {
                        //加载url-loader 同时安装 file-loader;
                        loader : 'url-loader',
                        options : {
                            //小于10000K的图片文件转base64到css里,当然css文件体积更大/这里做法是都使用路径;
                            limit : 1,
                            //设置最终img路径;
                            name : 'image/[name].[ext]',
                            //name : '[path][name].[ext]'
                        }
                    },
                    {
                        //压缩图片(另一个压缩图片：image-webpack-loader);
                        loader : 'img-loader',
                        options:{
                            minimize:true,
                            optimizationLevel:5,
                            progressive:true
                        }
                    },

                ]
            },
        ]
    },
    resolve:{
        modules: ["node_modules"],
        alias: {
            img: path.resolve(__dirname, 'src/image/'),
            components: path.resolve(__dirname, 'src/components/'),
            utils:path.resolve(__dirname,'src/utils/')
        }
    },
    plugins:pluginsFn(),
    devtool: isPro?'':'eval-source-map',
    devServer: {
        proxy: { // 代理
            '/api/': {
                target: 'http://www.jggvip.com',
                changeOrigin: true,
                //secure: false
            },
            '/graphql': {
                target: 'http://api.jggvip.com',
                changeOrigin: true,
            },
        },
        contentBase: '/dist', //
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
        // ...
    },
}