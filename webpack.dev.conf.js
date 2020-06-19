const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'deveplopment',
    entry: {
        app: './src/index.js'
    },
    output: { //输出文件路径设置
        filename: '[name][bundle].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: 'build'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}