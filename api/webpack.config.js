const path = require('path');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  entry: './server.ts',
  mode: NODE_ENV,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  resolve: {
    alias: {
      '@monitor': path.resolve(__dirname)
    },
    extensions: ['.ts', '.mjs', '.js'],
  },
  devtool: 'source-map',
}