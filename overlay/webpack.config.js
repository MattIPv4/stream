const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
    // Set the webpack mode
    mode: env.production ? 'production' : 'development',
    // Set our script as the entry point
    entry: path.join(__dirname, 'index.js'),
    // Set our output to always be dist/main.js
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '..', 'dist', 'overlay'),
        clean: true,
    },
    // Load the html plugin
    plugins: [
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
    ],
    // Include source maps when in development
    devtool: !env.production && 'inline-source-map',
    module: {
        rules: [
            // Our scss styling needs to loaded
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            // Our images need to be loaded
            {
                test: /\.png$/i,
                type: 'asset/resource'
            },
            {
                test: /\.svg$/i,
                type: 'asset/source'
            },
        ],
    },
});
