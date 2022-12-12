
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: ['babel-polyfill', path.resolve(__dirname, 'frontend/src/index.jsx')],
    entry: path.resolve(__dirname, 'frontend/src/index.jsx'),
    output: {
        // options related to how webpack emits results

        // where compiled files go
        path: path.resolve(__dirname, "frontend/static/frontend/public/"),

        // 127.0.0.1/static/frontend/public/ where files are served from
        publicPath: "/static/frontend/public/",
        filename: 'main.js',  // the same one we import in index.html
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                // regex test for js and jsx files
                test: /\.(js|jsx)?$/,
                // don't look in the node_modules/ folder
                exclude: /node_modules/,
                // for matching files, use the babel-loader
                use: {
                    loader: "babel-loader",
                    //options: {presets: ["@babel/env"]}
                    options: {
                        presets: [
                            "@babel/react",
                            "@babel/env"
                        ],
                        plugins: [
                            // "@babel/proposal-class-properties",
                            // "@babel/plugin-transform-runtime",
                            "@babel/plugin-transform-react-jsx",
                            "@babel/plugin-proposal-optional-chaining",
                            "@babel/plugin-proposal-nullish-coalescing-operator",
                        ]
                    },
                }
            },
            {
                test: /\.css$/,
                use: {
                    loader: "css-loader"
                },
            }
        ],
    },
};