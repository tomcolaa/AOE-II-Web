var path = require('path');

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
            use: [
              'file-loader',
            ],
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
      contentBase: './src'
    }
};
