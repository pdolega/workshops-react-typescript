var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var webpack = require("webpack");

module.exports = [
    {
        // uncomment line below for quick rebuilds during development
        //devtool: "eval",

        // uncomment line below during development if you want to have full debugging available
        //devtool: "sourcemap",
        name: "browser",
        entry: {
            app: [
                "./src/import.ts",
                "./src/App.tsx"
            ]
        },
        output: {
            path: path.join(__dirname, "public/js"),
            filename: "[name].bundle.js",
            publicPath: "/js/"
        },
        resolve: {
            extensions: ["", ".ts", ".tsx", ".js", ".html"],
            modulesDirectories: ["node_modules"],
            alias: {
                'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery')
            }
        },
        module: {
            loaders: [
                {
                    test: /\.(ts|tsx)$/,
                    loaders: ["react-hot", "awesome-typescript"]
                }, {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('css')
                }
            ]
        },
        plugins: [
            function () {
                this.plugin("done", function (stats) {
                    if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                        console.log(stats.compilation.errors);
                        process.exit(1); // or throw new Error('webpack build failed.');
                    }
                });
            },
            new ExtractTextPlugin('bundle.css', {
                allChunks: true,
                disable: false
            }),
            new ForkCheckerPlugin()
        ],
        node: {
            dns: 'mock',
            net: 'mock'
        }
    }
];
