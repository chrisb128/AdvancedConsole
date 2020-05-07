const path = require('path');

module.exports = {
  entry: './src/server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  target: "node",
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false  // and __filename return blank or /
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ [
              '@babel/preset-env',
              {
                targets: {
                  esmodules: true,
                },
              }
            ] ]
          }
        }
      }
    ]
  }
};