const webpack = require("webpack");
const path = require("path");
var CompressionPlugin = require("compression-webpack-plugin");

const config = {
  entry: "./client/src/App.jsx",
  output: {
    path: path.resolve(__dirname, "client/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [new CompressionPlugin()]
};

module.exports = config;
