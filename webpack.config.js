const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // Change to your "entry-point".
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
          {
            // Include ts, tsx, js, and jsx files.
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            }
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ],
          }
        ],
    },
    devServer: {
      contentBase: './src',
      open: true
    },
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization:{
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ]
    }
};
