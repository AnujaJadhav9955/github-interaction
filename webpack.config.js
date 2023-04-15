const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*"],
  },
  resolve: {
    extensions: [".js", ".html"],
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [{from: "./src/index.html", to: 'index.html'},] 
    })
  ],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./build"),
    clean: true,
  },
};